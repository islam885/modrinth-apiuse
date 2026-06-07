# Mod Browser Web 🛠️

<div align="center">
  <img src="./src/assets/react.svg" width="100" height="100" alt="Logo" />
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Modrinth_API-30B030?style=for-the-badge&logo=modrinth&logoColor=white" alt="Modrinth" />
  </p>
</div>

---

## 🌐 Language / Язык
- [English](#english)
- [Русский](#русский)

---

<a name="english"></a>
# [EN] English Version

A high-performance, strictly minimalist web interface for discovering and managing Minecraft modifications. Powered by the **Modrinth API**, this application provides a professional-grade experience for power users.

### ✨ Key Features
- **Strict Dark Minimalism:** Optimized for concentration and speed.
- **Aggressive Parsing:** Clean version numbers without visual noise.
- **Smart Filtering:** Advanced filters for loaders, stability (Alpha/Beta), and environment.
- **Total Version Logic:** Semantic sorting and color-coded stability side-borders.

### 📂 Code Examples (`/test`)
Explore the `test/` directory for standalone scripts demonstrating Modrinth API integration:
- `test_search.py`: Basic keyword search.
- `test_details.py`: Fetch comprehensive project metadata.
- `test_versions.js`: List all published versions for a project.
- `test_download.tsx`: Extract direct download links using TypeScript.
- `test_user_projects.py`: Retrieve projects by a specific author.
- `test_global_stats.py`: Get platform-wide statistics.
- `test_facets.js`: Advanced filtering using Modrinth facets.

---

<a name="русский"></a>
# [RU] Русская версия

Высокопроизводительный, строго минималистичный веб-интерфейс для поиска и управления модификациями Minecraft. Работает на базе **Modrinth API**, обеспечивая профессиональный опыт для продвинутых пользователей.

### ✨ Основные возможности
- **Строгий Тёмный Минимализм:** Интерфейс, оптимизированный для скорости и концентрации.
- **Агрессивный Парсинг:** Чистые номера версий без лишнего визуального мусора.
- **Умная Фильтрация:** Продвинутые фильтры по загрузчикам, стабильности (Alpha/Beta) и окружению.
- **Логика Версий:** Семантическая сортировка и цветовая индикация статуса сборки.

### 📂 Примеры кода (`/test`)
В папке `test/` вы найдете скрипты, демонстрирующие работу с Modrinth API:
- `test_search.py`: Базовый поиск по ключевым словам.
- `test_details.py`: Получение полных метаданных проекта.
- `test_versions.js`: Список всех опубликованных версий.
- `test_download.tsx`: Получение прямых ссылок на скачивание (TypeScript).
- `test_user_projects.py`: Проекты конкретного автора.
- `test_global_stats.py`: Глобальная статистика платформы.
- `test_facets.js`: Продвинутая фильтрация с использованием фасетов.

## 🛠️ Technical Stack
- **Framework:** React 18+
- **Language:** TypeScript
- **API:** Modrinth API v2
- **Icons:** Lucide React

## 🚀 Getting Started
```bash
npm install
npm run dev
```

---
*Created with a focus on precision and performance.*
