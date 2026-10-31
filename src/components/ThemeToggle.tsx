"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Smartphone, Download, CheckCircle2, X, Share, PlusSquare, MoreVertical, AlertTriangle } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <button onClick={toggleTheme} className="flex items-center justify-between w-full p-4 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-secky-blue-50 dark:bg-secky-blue-600/20 flex items-center justify-center">
          {isDark ? <Moon size={16} className="text-secky-blue-600 dark:text-secky-cyan-400" /> : <Sun size={16} className="text-secky-blue-600" />}
        </div>
        <div className="text-left">
          <p className="font-semibold text-sm text-secky-blue-900 dark:text-white">Mode sombre</p>
          <p className="text-[11px] text-neutral-500">Suivre les préférences système</p>
        </div>
      </div>
      <div className={`w-12 h-7 rounded-full transition-colors relative ${isDark ? "bg-secky-blue-600" : "bg-neutral-200 dark:bg-neutral-700"}`}>
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isDark ? "left-6" : "left-1"}`}></div>
      </div>
    </button>
  );
}

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Détection de l'OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Vérification de la sécurité (HTTPS ou localhost)
    const isSecureContext = window.isSecureContext || window.location.hostname === "localhost";
    setIsSecure(isSecureContext);

    // Vérification si déjà installée
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Écoute de l'événement d'installation
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setIsInstalled(true);
      setDeferredPrompt(null);
    } else {
      // Si pas de prompt natif, on ouvre la modale explicative
      setShowModal(true);
    }
  };

  if (!mounted) return null;

  if (isInstalled) {
    return (
      <div className="flex items-center justify-between w-full p-4 rounded-xl bg-green-50 dark:bg-green-500/10">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-status-success" />
          <p className="text-sm font-bold text-status-success">Application installée</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <button onClick={handleInstallClick} className="flex items-center justify-between w-full p-4 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-xl transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secky-blue-50 dark:bg-secky-blue-600/20 flex items-center justify-center">
            <Smartphone size={16} className="text-secky-blue-600 dark:text-secky-cyan-400" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm text-secky-blue-900 dark:text-white">Installer l'application</p>
            <p className="text-[11px] text-neutral-500">Accès rapide depuis votre écran d'accueil</p>
          </div>
        </div>
        <Download size={20} className="text-neutral-400" />
      </button>

      {/* Modale d'installation */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-[#0C1D43] w-full md:w-[440px] rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-neutral-200 dark:bg-white/10 rounded-full mx-auto mb-6 md:hidden"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-secky-blue-900 dark:text-white">Installer SeckyPay</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Alerte si pas en HTTPS */}
            {!isSecure && (
              <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl p-4 mb-6 flex gap-3">
                <AlertTriangle size={20} className="text-status-warning shrink-0" />
                <div>
                  <p className="text-sm font-bold text-orange-900 dark:text-orange-400">Connexion non sécurisée</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300/70 font-medium mt-1">
                    L'installation nécessite HTTPS. Vous êtes sur HTTP. Utilisez un tunnel (ngrok) ou déployez sur Vercel pour tester l'installation.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-[#F8FAFC] dark:bg-white/5 rounded-2xl p-5 mb-4">
              <p className="text-sm font-bold text-secky-blue-900 dark:text-white mb-4">Comment installer sur votre téléphone :</p>
              
              {isIOS ? (
                // Guide iOS
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secky-blue-100 dark:bg-secky-blue-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-secky-blue-600 dark:text-secky-cyan-400">1</div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 pt-0.5">Appuyez sur l'icône <Share size={14} className="inline mx-1" /> <strong>Partager</strong> en bas de Safari.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secky-blue-100 dark:bg-secky-blue-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-secky-blue-600 dark:text-secky-cyan-400">2</div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 pt-0.5">Faites défiler et appuyez sur <PlusSquare size={14} className="inline mx-1" /> <strong>Sur l'écran d'accueil</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secky-blue-100 dark:bg-secky-blue-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-secky-blue-600 dark:text-secky-cyan-400">3</div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 pt-0.5">Appuyez sur <strong>Ajouter</strong> en haut à droite.</p>
                  </div>
                </div>
              ) : (
                // Guide Android
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secky-blue-100 dark:bg-secky-blue-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-secky-blue-600 dark:text-secky-cyan-400">1</div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 pt-0.5">Appuyez sur les <MoreVertical size={14} className="inline mx-1" /> <strong>trois points</strong> en haut à droite de Chrome.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secky-blue-100 dark:bg-secky-blue-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-secky-blue-600 dark:text-secky-cyan-400">2</div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 pt-0.5">Appuyez sur <strong>Installer l'application</strong> ou <strong>Ajouter à l'écran d'accueil</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secky-blue-100 dark:bg-secky-blue-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-secky-blue-600 dark:text-secky-cyan-400">3</div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 pt-0.5">Appuyez sur <strong>Installer</strong>.</p>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setShowModal(false)} className="w-full h-12 bg-secky-blue-600 text-white font-bold rounded-xl hover:bg-secky-blue-800 transition-colors">
              J'ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}