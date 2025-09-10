// script.js - funcionalidades educacionais: menu, rolagem suave, tema, FAQ e exemplos
document.addEventListener('DOMContentLoaded', () => {
  // Navegação responsiva (abrir/fechar)
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  navToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    primaryNav.setAttribute('aria-hidden', String(!open));
  });

  // Rolagem suave para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#intro') return; // permitir comportamento padrão
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
      // fechar menu em telas pequenas
      if (primaryNav.classList.contains('open')){
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  });

  // Tema (claro/escuro) com localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);
  else if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next === 'light' ? '': 'dark');
    localStorage.setItem('theme', next === 'light' ? '': 'dark');
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
  });

  // Exemplo: mostrar/ocultar conteúdo
  const exToggle = document.getElementById('ex-toggle');
  const exContent = document.getElementById('ex-content');
  exToggle.addEventListener('click', () => {
    const hidden = exContent.hasAttribute('hidden');
    if (hidden) exContent.removeAttribute('hidden'); else exContent.setAttribute('hidden','');
  });

  // FAQ toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) ans.setAttribute('hidden',''); else ans.removeAttribute('hidden');
    });
  });

  // Salvar nome do visitante no localStorage
  const nameInput = document.getElementById('visitor-name');
  const saveBtn = document.getElementById('save-name');
  const greeting = document.getElementById('greeting');
  const savedName = localStorage.getItem('visitorName');
  if (savedName) greeting.textContent = `Olá, ${savedName}! Bem-vindo.`;
  saveBtn.addEventListener('click', () => {
    const val = nameInput.value.trim();
    if (!val) return;
    localStorage.setItem('visitorName', val);
    greeting.textContent = `Olá, ${val}! Obrigado por visitar.`;
  });
});
