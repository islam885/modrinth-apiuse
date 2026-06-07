import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Search, 
  Download, 
  Users, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Info,
  Layers,
  Box,
  Heart,
  Clock,
  Shield,
  Monitor,
  Server,
  Filter,
  Eye,
  Settings,
  Grid,
  List as ListIcon,
  Gamepad2,
  Brush,
  Coins,
  Sword,
  Apple,
  Cpu,
  Wand2,
  BarChart3,
  Dices,
  Ghost,
  Zap,
  Share2,
  Database,
  Wrench,
  Globe2,
  Compass,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import './App.css';

interface Project {
  project_id: string;
  title: string;
  description: string;
  icon_url: string;
  author: string;
  downloads: number;
  follows: number;
  date_created: string;
  date_modified: string;
  latest_version?: string;
  license: string;
  categories: string[];
  client_side: string;
  server_side: string;
}

interface Version {
  id: string;
  version_number: string;
  name: string;
  files: { url: string; filename: string; size: number }[];
  game_versions: string[];
  loaders: string[];
  date_published: string;
}

const GAME_VERSIONS = [
  '26.1.2', '26.1.1', '26.1', '1.21.11', '1.21.10', '1.21.9', '1.21.8', '1.21.7', '1.21.6', '1.21.5', '1.21.4', '1.21.3', '1.21.2', '1.21.1', '1.21',
  '1.20.6', '1.20.5', '1.20.4', '1.20.3', '1.20.2', '1.20.1', '1.20',
  '1.19.4', '1.19.3', '1.19.2', '1.19.1', '1.19',
  '1.18.2', '1.18.1', '1.18',
  '1.17.1', '1.17',
  '1.16.5', '1.16.4', '1.16.3', '1.16.2', '1.16.1', '1.16',
  '1.15.2', '1.15.1', '1.15',
  '1.14.4', '1.14.3', '1.14.2', '1.14.1', '1.14',
  '1.13.2', '1.13.1', '1.13',
  '1.12.2', '1.12.1', '1.12',
  '1.11.2', '1.11.1', '1.11',
  '1.10.2', '1.10.1', '1.10',
  '1.9.4', '1.9.3', '1.9.2', '1.9.1', '1.9',
  '1.8.9', '1.8.8', '1.8.7', '1.8.6', '1.8.5', '1.8.4', '1.8.3', '1.8.2', '1.8.1', '1.8',
  '1.7.10', '1.7.9', '1.7.8', '1.7.7', '1.7.6', '1.7.5', '1.7.4', '1.7.3', '1.7.2',
  '1.6.4', '1.6.2', '1.6.1',
  '1.5.2', '1.5.1',
  '1.4.7', '1.4.6', '1.4.5', '1.4.4', '1.4.2',
  '1.3.2', '1.3.1',
  '1.2.5', '1.2.4', '1.2.3', '1.2.2', '1.2.1',
  '1.1', '1.0'
];

const LOADERS = [
  'fabric', 'forge', 'neoforge', 'babric', 'quilt', 'legacy-fabric', 'liteloader', 'risugami', 'nil-loader', 'ornithe', 'rift'
];

const CATEGORIES = [
  { id: 'adventure', name: 'Приключения', icon: <Compass size={14} /> },
  { id: 'cursed', name: 'Проклятые', icon: <Ghost size={14} /> },
  { id: 'decoration', name: 'Декорации', icon: <Brush size={14} /> },
  { id: 'economy', name: 'Экономика', icon: <Coins size={14} /> },
  { id: 'equipment', name: 'Снаряжение', icon: <Sword size={14} /> },
  { id: 'food', name: 'Еда', icon: <Apple size={14} /> },
  { id: 'game-mechanics', name: 'Механики', icon: <Gamepad2 size={14} /> },
  { id: 'library', name: 'Библиотеки', icon: <Database size={14} /> },
  { id: 'magic', name: 'Магия', icon: <Wand2 size={14} /> },
  { id: 'management', name: 'Управление', icon: <BarChart3 size={14} /> },
  { id: 'minigame', name: 'Мини-игры', icon: <Dices size={14} /> },
  { id: 'mobs', name: 'Мобы', icon: <Users size={14} /> },
  { id: 'optimization', name: 'Оптимизация', icon: <Zap size={14} /> },
  { id: 'social', name: 'Социальные', icon: <Share2 size={14} /> },
  { id: 'storage', name: 'Хранилище', icon: <Layers size={14} /> },
  { id: 'technology', name: 'Технологии', icon: <Cpu size={14} /> },
  { id: 'transportation', name: 'Транспорт', icon: <Settings size={14} /> },
  { id: 'utility', name: 'Утилиты', icon: <Wrench size={14} /> },
  { id: 'world-generation', name: 'Генерация мира', icon: <Globe2 size={14} /> }
];

const SORT_OPTIONS = [
  { id: 'relevance', name: 'Популярность' },
  { id: 'downloads', name: 'Скачивания' },
  { id: 'follows', name: 'Подписки' },
  { id: 'newest', name: 'Дата публикации' },
  { id: 'updated', name: 'Дата обновления' }
];

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

function formatRelativeTime(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'только что';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} ${pluralize(diffInMinutes, ['минуту', 'минуты', 'минут'])} назад`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ${pluralize(diffInHours, ['час', 'часа', 'часов'])} назад`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} ${pluralize(diffInDays, ['день', 'дня', 'дней'])} назад`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} ${pluralize(diffInMonths, ['месяц', 'месяца', 'месяцев'])} назад`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${pluralize(diffInYears, ['год', 'года', 'лет'])} назад`;
}

function App() {
  const [query, setQuery] = useState('');
  const [mods, setMods] = useState<Project[]>([]);
  const [selectedMod, setSelectedMod] = useState<Project | null>(null);
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchPhase, setSearchPhase] = useState<'idle' | 'exiting' | 'thinking' | 'entering'>('idle');
  const [aiThought, setAiThought] = useState('');
  
  const [filters, setFilters] = useState({
    version: '',
    loader: '',
    category: '',
    environment: 'any' as 'any' | 'client' | 'server',
    license: 'any' as 'any' | 'open-source',
    sortBy: 'relevance',
    limit: 12
  });

  const [versionFilters, setVersionFilters] = useState({
    loader: 'all',
    showAlpha: true,
    showBeta: true
  });

  const LOADER_PRIORITY: Record<string, number> = {
    'fabric': 1,
    'quilt': 2,
    'neoforge': 3,
    'forge': 4,
    'babric': 5,
    'legacy-fabric': 6
  };

  const STABILITY_PRIORITY: Record<string, number> = {
    'release': 1,
    'beta': 2,
    'alpha': 3
  };

  const parseVersionInfo = (v: Version) => {
    let stability = 'release';
    const lowName = v.name.toLowerCase();
    const lowNum = v.version_number.toLowerCase();
    
    if (lowName.includes('alpha') || lowNum.includes('alpha')) stability = 'alpha';
    else if (lowName.includes('beta') || lowNum.includes('beta') || lowName.includes('pre') || lowNum.includes('pre')) stability = 'beta';

    const mcVer = v.game_versions[0] || 'Any';
    let rawVer = v.version_number;

    // 1. Remove obvious noise words and technical suffixes
    let cleanVer = rawVer
      .replace(/\.(build|mod|modern|lts|patched|fix|hotfix|release|stable|dist|jar|all|universal)\.?/gi, '.')
      .replace(/^v/i, '');

    // 2. Token-based filtering
    const titleTokens = selectedMod ? selectedMod.title.toLowerCase().split(/\s+/) : [];
    const noiseTokens = ['fabric', 'forge', 'neoforge', 'quilt', 'liteloader', 'babric', 'legacy', 'mc', 'build', 'version', 'ver', 'for'];
    
    let parts = cleanVer.split(/[+-\s]/);
    let cleanedParts = parts.filter(part => {
      const p = part.toLowerCase().replace(/^\.+|\.+$/g, '');
      if (!p) return false;
      if (noiseTokens.includes(p)) return false;
      if (titleTokens.includes(p)) return false;
      // Skip if token looks like a Minecraft version (e.g. 1.21.1, 26.1)
      if (/^\d+(\.\d+)*(\.x)?$/i.test(p)) {
        if (mcVer.includes(p) || p.startsWith('1.') || p.startsWith('26.')) return false;
      }
      return true;
    });

    let modVer = cleanedParts.join('.').replace(/\.{2,}/g, '.').replace(/^\.+|\.+$/g, '').trim();

    // 3. Fallback: If cleaning was too aggressive, use a safer basic cleanup
    if (!modVer || modVer.length < 2) {
      modVer = rawVer
        .replace(new RegExp(selectedMod?.title || '', 'gi'), '')
        .replace(/^mc\d+(\.\d+)*-?/i, '')
        .replace(/^[v+-]+/i, '')
        .replace(/-(fabric|forge|neoforge|quilt|liteloader|babric|legacy-fabric|mc\d+.*)$/i, '')
        .trim();
    }

    // Final sanity check: if it still has "mc" or "for" at the start, nuk it
    modVer = modVer.replace(/^(mc|for|v|ver|version)[-.\s]*/i, '').trim();

    return { mcVer, modVer, stability };
  };

  const filteredAndSortedVersions = versions
    .filter(v => {
      const { stability } = parseVersionInfo(v);
      if (stability === 'alpha' && !versionFilters.showAlpha) return false;
      if (stability === 'beta' && !versionFilters.showBeta) return false;
      if (versionFilters.loader !== 'all' && !v.loaders.includes(versionFilters.loader)) return false;
      return true;
    })
    .sort((a, b) => {
      const infoA = parseVersionInfo(a);
      const infoB = parseVersionInfo(b);
      if (STABILITY_PRIORITY[infoA.stability] !== STABILITY_PRIORITY[infoB.stability]) {
        return STABILITY_PRIORITY[infoA.stability] - STABILITY_PRIORITY[infoB.stability];
      }
      return infoB.modVer.localeCompare(infoA.modVer, undefined, { numeric: true, sensitivity: 'base' });
    });

  const availableLoadersInVersions = Array.from(new Set(versions.flatMap(v => v.loaders)));

  const fetchMods = useCallback(async () => {
    if (searchPhase !== 'idle') return;
    setLoading(true);

    const getFacets = () => {
      let facets = '[["project_type:mod"]';
      if (filters.version) facets += `,["versions:${filters.version}"]`;
      if (filters.loader) facets += `,["categories:${filters.loader}"]`;
      if (filters.category) facets += `,["categories:${filters.category}"]`;
      if (filters.environment === 'client') facets += ',["client_side:required","client_side:optional"]';
      if (filters.environment === 'server') facets += ',["server_side:required","server_side:optional"]';
      if (filters.license === 'open-source') facets += ',["license:mit","license:apache-2.0","license:gpl-3.0"]';
      return facets + ']';
    };

    try {
      const response = await axios.get('https://api.modrinth.com/v2/search', {
        params: { query, offset: page * filters.limit, limit: filters.limit, index: filters.sortBy, facets: getFacets() }
      });
      setMods(response.data.hits);
      setTotalCount(response.data.total_hits);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [query, page, filters, searchPhase]);

  useEffect(() => {
    const timer = setTimeout(() => fetchMods(), 600);
    return () => clearTimeout(timer);
  }, [fetchMods]);

  const fetchVersions = async (projectId: string) => {
    try {
      const response = await axios.get(`https://api.modrinth.com/v2/project/${projectId}/version`);
      setVersions(response.data);
    } catch (error) {
      console.error('Error fetching versions:', error);
    }
  };

  const handleModSelect = (mod: Project) => {
    setSelectedMod(mod);
    setVersions([]);
    fetchVersions(mod.project_id);
  };

  const toggleFilter = (type: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [type]: prev[type] === value && !['limit', 'sortBy'].includes(type) ? '' : value }));
    setPage(0);
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + ' млрд';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + ' млн';
    if (num >= 1000) return (num / 1000).toFixed(1) + ' тыс';
    return num.toString();
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="search-group">
          <div className="search-header-row">
            <label className="filter-title">Поиск</label>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={16} className="search-icon" />
            <input 
              className="search-input" 
              placeholder="Название мода..." 
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); setSelectedMod(null); }}
            />
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-title">Версия игры</label>
          <div className="scroll-list larger">
            {GAME_VERSIONS.map(v => (
              <div key={v} className={`list-item ${filters.version === v ? 'active' : ''}`} onClick={() => { toggleFilter('version', v); setSelectedMod(null); }}>{v}</div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-title">Загрузчик</label>
          <div className="scroll-list larger">
            {LOADERS.map(l => (
              <div key={l} className={`list-item ${filters.loader === l ? 'active' : ''}`} onClick={() => { toggleFilter('loader', l); setSelectedMod(null); }}>{l}</div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-title">Категории</label>
          <div className="scroll-list larger">
            {CATEGORIES.map(c => (
              <div key={c.id} className={`list-item ${filters.category === c.id ? 'active' : ''}`} onClick={() => { toggleFilter('category', c.id); setSelectedMod(null); }}>
                {c.icon}
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-title">Окружение</label>
          <div className="segmented-control">
            {['any', 'client', 'server'].map(env => (
              <button key={env} className={filters.environment === env ? 'active' : ''} onClick={() => { toggleFilter('environment', env); setSelectedMod(null); }}>
                {env === 'any' ? 'Любое' : env === 'client' ? <Monitor size={14} /> : <Server size={14} />}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-title">Лицензия</label>
          <div className="switch-row">
            <span>Open Source</span>
            <div className={`ios-switch ${filters.license === 'open-source' ? 'on' : ''}`} onClick={() => { toggleFilter('license', filters.license === 'open-source' ? 'any' : 'open-source'); setSelectedMod(null); }} />
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-title">Сортировка</label>
          <select className="ios-select" value={filters.sortBy} onChange={(e) => toggleFilter('sortBy', e.target.value)}>
            {SORT_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
        </div>

        <div className="filter-section">
          <label className="filter-title">Лимит: {filters.limit}</label>
          <input type="range" min="5" max="100" step="5" value={filters.limit} onChange={(e) => toggleFilter('limit', parseInt(e.target.value))} className="ios-range" />
        </div>

        <div className="status-bar" style={{ marginTop: 'auto' }}>
          {loading ? <div className="ios-spinner-sm" /> : <Box size={14} />}
          <span>{loading ? 'Загрузка...' : `Найдено: ${formatNumber(totalCount)}`}</span>
        </div>
      </aside>

      <main className={`main-content ${selectedMod ? 'detail-active' : ''}`}>
        {!selectedMod ? (
          <section className="results-area">
            <div className="mod-grid">
              {mods.map((mod, index) => (
                <div key={mod.project_id} className="mod-card" style={{ animationDelay: `${index * 0.05}s` }} onClick={() => handleModSelect(mod)}>
                  <div className="mod-card-top">
                    <img src={mod.icon_url || 'https://api.modrinth.com/placeholder.svg'} alt={mod.title} className="mod-icon" />
                    <div className="mod-card-content">
                      <div className="mod-header-row">
                        <div className="mod-title-group">
                          <span className="mod-title">{mod.title} <span className="mod-author-inline">by {mod.author}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mod-desc">{mod.description}</div>
                  <div className="mod-card-footer">
                    <div className="mod-tags">
                      {mod.client_side !== 'unsupported' && <span className="tag client">Client</span>}
                      {mod.server_side !== 'unsupported' && <span className="tag server">Server</span>}
                    </div>
                    <div className="mod-actions">
                      <div className="mod-stat-item"><Download size={14} /><span>{formatNumber(mod.downloads)}</span></div>
                      <button className="fav-btn-minimal" onClick={(e) => toggleFavorite(e, mod.project_id)}>
                        <Heart size={16} fill={favorites.includes(mod.project_id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!loading && mods.length === 0 && (
              <div className="empty-state">
                <AlertCircle size={48} color="var(--text-3)" />
                <p>Ничего не найдено. Попробуйте изменить запрос.</p>
              </div>
            )}
            <div className="pagination-ios">
              <button disabled={page === 0} onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="p-btn"><ChevronLeft size={20} /></button>
              <span className="p-text">Страница {page + 1} из {Math.ceil(totalCount / filters.limit) || 1}</span>
              <button disabled={(page + 1) * filters.limit >= totalCount} onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="p-btn"><ChevronRight size={20} /></button>
            </div>
          </section>
        ) : (
          <section className="full-detail-view">
            <div className="back-nav-centered">
              <button className="back-btn-minimal-v2" onClick={() => setSelectedMod(null)}><ChevronLeft size={16} /><span>Вернуться к списку</span></button>
            </div>
            <div className="detail-hero">
              <div className="detail-hero-content">
                <img src={selectedMod.icon_url || 'https://api.modrinth.com/placeholder.svg'} alt={selectedMod.title} className="detail-hero-icon" />
                <div className="detail-hero-text">
                  <h1 className="detail-hero-title">{selectedMod.title}</h1>
                  <p className="detail-hero-author">by {selectedMod.author}</p>
                  <div className="detail-hero-tags">{selectedMod.categories.slice(0,5).map(c => <span key={c} className="tag category large">{c}</span>)}</div>
                </div>
              </div>
              <div className="detail-hero-stats">
                <div className="hero-stat"><span className="hero-stat-label">СКАЧИВАНИЙ</span><span className="hero-stat-val">{formatNumber(selectedMod.downloads)}</span></div>
                <div className="hero-stat"><span className="hero-stat-label">ПОДПИСЧИКОВ</span><span className="hero-stat-val">{formatNumber(selectedMod.follows)}</span></div>
              </div>
            </div>
            <div className="detail-grid-layout">
              <div className="detail-main-column">
                <div className="detail-card description-card">
                  <h3 className="card-title">Описание</h3>
                  <p className="description-text">{selectedMod.description}</p>
                </div>
                <div className="detail-card versions-card">
                   <div className="card-header-with-filters">
                    <h3 className="card-title">Доступные версии</h3>
                    <div className="v-toolbar">
                      <div className="v-select-wrapper">
                        <select className="v-select-premium" value={versionFilters.loader} onChange={(e) => setVersionFilters(prev => ({...prev, loader: e.target.value}))}>
                          <option value="all">Все лоадеры</option>
                          {availableLoadersInVersions.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                        </select>
                      </div>
                      <div className="v-toggle-group">
                        <button className={`v-toggle-btn ${versionFilters.showBeta ? 'active' : ''}`} onClick={() => setVersionFilters(v => ({...v, showBeta: !v.showBeta}))}>Beta</button>
                        <button className={`v-toggle-btn ${versionFilters.showAlpha ? 'active' : ''}`} onClick={() => setVersionFilters(v => ({...v, showAlpha: !v.showAlpha}))}>Alpha</button>
                      </div>
                    </div>
                  </div>
                  <div className="versions-table">
                    <div className="version-header"><span>Сборка</span><span>Загрузчик</span><span>Дата</span><span>Файл</span></div>
                    {filteredAndSortedVersions.map(v => {
                      const p = parseVersionInfo(v);
                      return (
                        <div key={v.id} className={`version-row-large stability-${p.stability}`}>
                          <div className="v-info-stack">
                            <span className="v-mod-version">{p.modVer}</span>
                            <div className="v-meta-row">
                              <span className={`v-status-badge ${p.stability}`}>{p.stability}</span>
                              <span className="v-mc-label">Minecraft {p.mcVer}</span>
                            </div>
                          </div>
                          <div className="v-loaders">{v.loaders.map(l => <span key={l} className={`loader-pill ${l}`}>{l}</span>)}</div>
                          <span className="v-date mono">{new Date(v.date_published).toLocaleDateString()}</span>
                          <a href={v.files[0]?.url} className="v-dl-btn"><Download size={16} /></a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <aside className="detail-side-column">
                <div className="detail-card info-card">
                  <h3 className="card-title">Информация</h3>
                  <div className="side-info-list">
                    <div className="side-info-item"><span className="label">Лицензия</span><div className="value-block"><span className="value mono">{selectedMod.license}</span></div></div>
                    <div className="side-info-item"><span className="label">Окружение</span><div className="value-block"><span className="value mono">{selectedMod.client_side !== 'unsupported' ? 'Client' : ''} {selectedMod.server_side !== 'unsupported' ? '& Server' : ''}</span></div></div>
                    <div className="side-info-item"><span className="label">Проект создан</span><div className="value-block"><span className="value mono">{new Date(selectedMod.date_created).toLocaleDateString()}</span></div></div>
                    <div className="side-info-item"><span className="label">Последнее обновление</span><div className="value-block"><span className="value mono">{formatRelativeTime(selectedMod.date_modified)}</span></div></div>
                  </div>
                </div>
                <div className="actions-stack">
                  <button className={`fav-action-btn ${favorites.includes(selectedMod.project_id) ? 'active' : ''}`} onClick={(e) => toggleFavorite(e, selectedMod.project_id)}>
                    <Heart size={20} fill={favorites.includes(selectedMod.project_id) ? "currentColor" : "none"} />
                    <span>{favorites.includes(selectedMod.project_id) ? 'В избранном' : 'В избранное'}</span>
                  </button>
                  <button className="external-link-btn" onClick={() => window.open(`https://modrinth.com/mod/${selectedMod.project_id}`, '_blank')}><ExternalLink size={20} /><span>На Modrinth</span></button>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
