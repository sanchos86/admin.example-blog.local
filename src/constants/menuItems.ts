export default [
  {
    text: 'Главная',
    icon: 'mdi-home',
    to: { name: 'home' },
  },
  {
    icon: 'mdi-chevron-up',
    'icon-alt': 'mdi-chevron-down',
    text: 'Записи',
    model: false,
    children: [
      {
        text: 'Все записи',
        icon: 'mdi-file-document',
        to: { name: 'posts' },
      },
      {
        text: 'Добавить новую',
        icon: 'mdi-plus',
        to: { name: 'new-post' },
      },
      {
        text: 'Категории',
        icon: 'mdi-format-list-bulleted',
        to: { name: 'categories' },
      },
      {
        text: 'Тэги',
        icon: 'mdi-tag',
        to: { name: 'tags' },
      },
    ],
  },
  {
    icon: 'mdi-chevron-up',
    'icon-alt': 'mdi-chevron-down',
    text: 'Настройки',
    model: false,
    children: [
      {
        text: 'Профиль',
        icon: 'mdi-cog',
        to: { name: 'profile-settings' },
      },
    ],
  },
];
