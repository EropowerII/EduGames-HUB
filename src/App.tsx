import React, { useState, useMemo } from "react";
import { 
  Gamepad2, 
  BookOpen, 
  Sparkles, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Info, 
  Users, 
  CheckCircle,
  Lightbulb,
  RotateCcw
} from "lucide-react";
import { games, SubjectFilter, Game } from "./gamesData";

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("Todos");
  const [selectedAge, setSelectedAge] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"games" | "about">("games");

  // Filter games list
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSubject = selectedSubject === "Todos" || game.subject === selectedSubject;
      const matchesAge = selectedAge === "Todos" || game.age === selectedAge;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === "" || 
        game.title.toLowerCase().includes(query) || 
        game.description.toLowerCase().includes(query) ||
        game.skill.toLowerCase().includes(query);

      return matchesSubject && matchesAge && matchesSearch;
    });
  }, [selectedSubject, selectedAge, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Header Superior - Con un carácter serio y limpio para educadores */}
      <header className="sticky top-0 z-40 bg-[#F6F5F0]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 text-amber-500 p-2.5 rounded-2xl shadow-inner flex items-center justify-center">
              <Gamepad2 className="w-5.5 h-5.5" id="header-logo-icon" />
            </div>
            <div>
              <h1 id="main-title" className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                EDU<span className="text-amber-600">GAMES</span> <span className="text-slate-400 font-medium">HUB</span>
              </h1>
              <p id="main-tagline" className="text-[10px] text-stone-505 tracking-wider uppercase font-bold sm:block hidden">
                Portal de Aprendizaje Lúdico y Mini-juegos Educativos
              </p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 bg-stone-200/40 p-1 rounded-2xl text-sm" id="main-navigation">
            <button
              onClick={() => setActiveTab("games")}
              className={`px-4 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                activeTab === "games"
                  ? "bg-slate-950 text-white shadow-sm animate-fade-in"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Catálogo de Juegos
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                activeTab === "about"
                  ? "bg-slate-950 text-white shadow-sm animate-fade-in"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Para Padres y Profesores
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Estilo minimalista y de catálogo de tienda premium */}
      <section className="py-10 sm:py-14 px-4 border-b border-stone-200/60 bg-stone-100/50">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-955 tracking-tight">
            Aprender Jugando
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            Una colección selecta de mini-juegos interactivos con un sólido enfoque académico, ideal para escuelas, docentes y sesiones divertidas en casa.
          </p>
        </div>
      </section>

      {/* Main Content Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {activeTab === "games" && (
          <div className="space-y-10">
            {/* Control Panel: Buscador + Filtros estilo Tienda Moderna */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                
                {/* Search input to filter the store */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar juego por nombre, habilidad clave..."
                    className="w-full pl-11 pr-12 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-905 placeholder-stone-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-stone-100 hover:bg-stone-200/80 px-2 py-1 rounded-lg"
                    >
                      Borrar
                    </button>
                  )}
                </div>

                {/* Grid filters resembling premium store dropdown chips */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Subject selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5" /> Tema:
                    </span>
                    <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                      {(["Todos", "Lenguaje", "Matemáticas"] as const).map((subj) => (
                        <button
                          key={subj}
                          onClick={() => setSelectedSubject(subj)}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            selectedSubject === subj
                              ? subj === "Lenguaje"
                                ? "bg-amber-500 text-slate-950 font-bold"
                                : subj === "Matemáticas"
                                ? "bg-emerald-605 bg-emerald-600 text-white font-bold"
                                : "bg-slate-950 text-white font-bold"
                              : "text-slate-600 hover:text-slate-950"
                          }`}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Rango de Edad:
                    </span>
                    <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                      {(["Todos", "8 a 10"] as const).map((ageOpt) => (
                        <button
                          key={ageOpt}
                          onClick={() => setSelectedAge(ageOpt)}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            selectedAge === ageOpt
                              ? "bg-slate-950 text-white font-bold"
                              : "text-slate-600 hover:text-slate-955"
                          }`}
                        >
                          {ageOpt === "Todos" ? "Todas" : `${ageOpt} años`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status information of the current filter */}
              {(selectedSubject !== "Todos" || selectedAge !== "Todos" || searchQuery !== "") && (
                <div className="flex items-center justify-between text-xs bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-2xl text-amber-900">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>
                      Mostrando <strong className="font-bold">{filteredGames.length}</strong> {filteredGames.length === 1 ? "juego filtrado" : "juegos filtrados"} en la tienda.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSubject("Todos");
                      setSelectedAge("Todos");
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-1 hover:underline font-bold text-amber-800"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restablecer</span>
                  </button>
                </div>
              )}
            </div>

            {/* Store Grid Container */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" id="games-grid">
                {filteredGames.map((game) => {
                  const isLenguaje = game.subject === "Lenguaje";
                  
                  return (
                    <article 
                      key={game.id} 
                      id={`game-container-${game.id}`}
                      className="group bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden"
                    >
                      {/* aspect-ratio 3:4 container for thumbnail */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 flex-shrink-0">
                        {/* Background subtle geometric artwork matching the subject */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                          {/* Rich linear-gradients as modern backplate */}
                          <div className={`absolute inset-0 bg-gradient-to-tr opacity-95 ${
                            isLenguaje 
                              ? "from-amber-600 via-orange-500 to-rose-500" 
                              : "from-emerald-700 via-teal-600 to-cyan-600"
                          }`} />
                          {/* Low opacity abstract blueprint lines inside thumbnail */}
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff25_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
                          
                          {/* Beautiful decorative symbol centered to provide graphic richness even when images are empty */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {isLenguaje ? (
                              <div className="flex flex-col items-center text-white/10 select-none">
                                <span className="text-[120px] font-black tracking-tighter italic font-serif leading-none">A</span>
                                <span className="text-xs font-mono font-bold tracking-widest text-white/35 uppercase -mt-4">LENGUAJE</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center text-white/10 select-none">
                                <span className="text-[110px] font-bold font-mono leading-none">∑</span>
                                <span className="text-xs font-mono font-bold tracking-widest text-white/35 uppercase -mt-2">MATEMÁTICAS</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Image file from requested directory 'GameAssets/Thumbnails' */}
                        <img 
                          src={game.thumbnail}
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover z-20 group-hover:scale-105 transition-transform duration-505 transition-all"
                        />
                        
                        {/* Overlay to dim on hover of the image */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-25 pointer-events-none" />

                        {/* Top Left Corner: Distinctive Subject Game Tag */}
                        <div className="absolute top-4 left-4 z-30">
                          <span className={`inline-flex px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm ${
                            isLenguaje 
                              ? "bg-amber-400 text-slate-950 border border-amber-300" 
                              : "bg-emerald-400 text-slate-900 border border-emerald-300"
                          }`}>
                            {game.subject}
                          </span>
                        </div>

                        {/* Bottom Right Corner: Age Tag */}
                        <div className="absolute bottom-4 right-4 z-30">
                          <span className="inline-flex px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-slate-950/85 text-white border border-slate-700/60 backdrop-blur-xs shadow-sm">
                            {game.age} años
                          </span>
                        </div>
                      </div>

                      {/* Content Body: Designed like a clean, minimal retail catalog */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          {/* 1. Game Title under the miniature */}
                          <h3 className="text-xl font-bold tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors">
                            {game.title}
                          </h3>

                          {/* 2. Habilidad Clave under the game title */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                              Habilidad Clave:
                            </span>
                            <p className="text-stone-705 text-stone-800 font-semibold text-xs leading-snug">
                              {game.skill}
                            </p>
                          </div>

                          {/* 3. Game description */}
                          <p className="text-xs text-stone-500 leading-relaxed font-normal">
                            {game.description}
                          </p>
                        </div>

                        {/* 4. Play Button 'JUGAR' at the bottom of the card */}
                        <div className="pt-3 border-t border-stone-100">
                          <a
                            href={game.playUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                              isLenguaje
                                ? "bg-amber-500 hover:bg-amber-600 text-slate-950 hover:shadow-xs"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-xs"
                            }`}
                          >
                            <span>Jugar</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No se encontraron mini-juegos</h3>
                <p className="text-stone-500 text-xs">
                  Ningún juego coincide con los filtros aplicados en esta categoría de catalogado.
                </p>
                <button
                  onClick={() => {
                    setSelectedSubject("Todos");
                    setSelectedAge("Todos");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Restablecer
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab: Para Padres y Profesores (Academic Foundation) */}
        {activeTab === "about" && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="space-y-2 border-b border-stone-100 pb-6 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">Fundamento Pedagógico y de Confianza</h3>
              <p className="text-stone-600 text-sm">
                Diseñado para enriquecer el aula y el hogar de forma segura, estructurada y lúdica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-950">Refuerzo Curricular Directo</h4>
                </div>
                <p className="text-xs text-stone-605 text-stone-600 leading-relaxed">
                  Cada mini-juego responde a objetivos específicos estipulados en los programas curriculares oficiales de educación primaria. Al segmentar por materias básicas como <strong className="text-slate-800">Lenguaje</strong> y <strong className="text-slate-800">Matemáticas</strong>, facilitamos su uso como tarea complementaria o recurso de aula.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Users className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-955">Privacidad y Seguridad Absoluta</h4>
                </div>
                <p className="text-xs text-stone-605 text-stone-600 leading-relaxed">
                  La tranquilidad de las familias es crucial. Los juegos alojados en este portal cargan directamente en las cuentas de GitHub Pages creadas de manera transparente. No requerimos cuentas ni almacenamos información confidencial de los menores.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Lightbulb className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-955">Aprendizaje Libre de Frustración</h4>
                </div>
                <p className="text-xs text-stone-605 text-stone-600 leading-relaxed">
                  Basados en el concepto de dificultad progresiva, los juegos proveen retroalimentación inmediata sin penalizaciones severas, lo que incrementa la autopercepción de competencia del alumno.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <BookOpen className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <h4 className="font-bold text-slate-955">Sugerencias para Docentes</h4>
                </div>
                <p className="text-xs text-stone-605 text-stone-605 text-stone-605 text-stone-600 leading-relaxed">
                  Puede utilizar los juegos en sesiones grupales proyectándolos en la pizarra digital o asignándolos como reto semanal. Fomente la metacognición preguntando: <em className="text-stone-700 italic">"¿Qué estrategia usaste para resolver la pista más rápido?"</em> o <em className="text-stone-700 italic">"¿Cómo supiste que esa palabra era la correcta?"</em>
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-5 mt-6 flex gap-3.5 items-start">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-slate-950 text-sm">¿Cómo jugar?</h5>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Solo selecciona cualquier videojuego en la pestaña principal, presiona el botón "Jugar" y se abrirá directamente en una pestaña independiente. Puedes compartir los links individuales con tus estudiantes para accesos rápidos.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
