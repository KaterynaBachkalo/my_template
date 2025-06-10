import fs from 'fs';
import path from 'path';

const excludedClasses = [
  'swiper',
  'mySwiper',
  'right',
  'left',
  'active',
  'js-',
  'container',
  'png',
  'jpg',
  'custom-next',
  'custom-prev',
  'none',
];
const classMap = {};
const hashLength = 8;

function generateRandomHash(length = hashLength) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = chars.charAt(Math.floor(Math.random() * 52));
  for (let i = 1; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length),
    );
  }
  return result;
}

function shouldExcludeClass(className) {
  return excludedClasses.some((ex) =>
    className.includes(ex),
  );
}

function getHashedClassName(className) {
  if (shouldExcludeClass(className)) return className;
  if (!classMap[className]) {
    classMap[className] =
      `${className}_${generateRandomHash()}`;
  }
  return classMap[className];
}

function hashClassesInCSS(content) {
  return content.replace(
    /\.(?!\d)([a-zA-Z0-9_-]+)/g,
    (_, className) => {
      return `.${getHashedClassName(className)}`;
    },
  );
}

function hashClassesInHTML(content) {
  return content.replace(
    /class=["']([^"']+)["']/g,
    (_, classList) => {
      const newClassList = classList
        .split(/\s+/)
        .map((c) => getHashedClassName(c))
        .join(' ');
      return `class="${newClassList}"`;
    },
  );
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// function hashClassesInJS(content) {
//   Object.keys(classMap).forEach((original) => {
//     if (shouldExcludeClass(original)) return;
//     // if (original === '.js-menu-container') return; //не допомогло

//     const hashed = classMap[original];
//     const escaped = escapeRegExp(original);

//     const patterns = [
//       // querySelector(All)(".class"), або querySelector(".class tag")
//       new RegExp(
//         `(querySelector(All)?\\s*\\(\\s*['"\`][^'"\`]*?)\\b${escaped}\\b`, // тут не правильно
//         'g',
//       ),

//       // classList.add/remove/toggle/contains('class')
//       new RegExp(
//         `classList\\.(add|remove|toggle|contains)\\((['"\`])${escaped}\\2\\)`,
//         'g',
//       ),

//       // className = "class other"
//       new RegExp(
//         `className\\s*=\\s*(['"\`])([^'"\`]*?)\\b${escaped}\\b([^'"\`]*)\\1`,
//         'g',
//       ),

//       // Пряме використання 'class'
//       new RegExp(`(['"\`])${escaped}\\1`, 'g'),
//     ];

//     patterns.forEach((pattern) => {
//       content = content.replace(pattern, (match) => {
//         console.log('pattern', pattern);
//         console.log('match', match);
//         return match.replace(original, hashed);
//       });
//     });
//   });

//   return content;
// }

function hashClassesInJS(content) {
  // 1. Обробка querySelector / querySelectorAll('.class')
  content = content.replace(
    /querySelector(All)?\s*\(\s*(["'`])([^"'`]+?)\2/g,
    (match, all, quote, selector) => {
      const newSelector = selector
        .split(/\s+/)
        .map((s) => {
          if (s.startsWith('.')) {
            const className = s.slice(1);
            return '.' + getHashedClassName(className);
          }
          return s;
        })
        .join(' ');
      return match.replace(selector, newSelector);
    },
  );

  // 2. classList.add/remove/toggle/contains('class')
  content = content.replace(
    /classList\.(add|remove|toggle|contains)\((['"`])([^'"`]+?)\2\)/g,
    (match, method, quote, className) => {
      return `classList.${method}(${quote}${getHashedClassName(className)}${quote})`;
    },
  );

  // 3. className = "class1 class2"
  content = content.replace(
    /className\s*=\s*(["'`])([^"'`]+?)\1/g,
    (match, quote, classList) => {
      const newClassList = classList
        .split(/\s+/)
        .map((c) => getHashedClassName(c))
        .join(' ');
      return `className=${quote}${newClassList}${quote}`;
    },
  );

  // 4. Прямі збіги: 'className' → 'className_hash'
  Object.keys(classMap).forEach((original) => {
    if (shouldExcludeClass(original)) return;

    const hashed = classMap[original];
    const pattern = new RegExp(
      `(?<=['"\\s])${escapeRegExp(original)}(?=['"\\s])`,
      'g',
    );

    content = content.replace(pattern, hashed);
  });

  return content;
}

function processFile(filePath, ext) {
  let content = fs.readFileSync(filePath, 'utf-8');

  if (ext === '.css') content = hashClassesInCSS(content);
  else if (ext === '.html')
    content = hashClassesInHTML(content);
  else if (ext === '.js')
    content = hashClassesInJS(content);
  else return;

  fs.writeFileSync(filePath, content);
}

function processDirectoryByType(directory, type) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectoryByType(fullPath, type);
    } else {
      const ext = path.extname(fullPath);
      if (
        (type === 'css' && ext === '.css') ||
        (type === 'html' && ext === '.html') ||
        (type === 'js' && ext === '.js')
      ) {
        processFile(fullPath, ext);
      }
    }
  });
}

export default function classHashPlugin() {
  return {
    name: 'vite-plugin-class-hasher',
    apply: 'build',
    closeBundle() {
      const distPath = path.resolve('dist');

      // Етап 1: наповнюємо classMap
      processDirectoryByType(distPath, 'css');
      processDirectoryByType(distPath, 'html');

      // Етап 2: підставляємо в JS
      processDirectoryByType(distPath, 'js');

      // Зберігаємо карту
      fs.writeFileSync(
        '.temp/class-map.json',
        JSON.stringify(classMap, null, 2),
      );
    },
  };
}

// Problems
//.js-menu-container - to remove hash in js
