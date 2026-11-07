"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, TrendingUp } from "lucide-react";

interface Country {
  code: string;
  name: string;
  flag: string;
  votes: number;
}

const initialCountries: Country[] = [
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", votes: 1245 },
  { code: "SEN", name: "Sénégal", flag: "🇸🇳", votes: 892 },
  { code: "BEN", name: "Bénin", flag: "🇧🇯", votes: 734 },
  { code: "TGO", name: "Togo", flag: "🇹🇬", votes: 521 },
  { code: "MLI", name: "Mali", flag: "🇲🇱", votes: 468 },
  { code: "NER", name: "Niger", flag: "🇳🇪", votes: 312 },
];

export function CountryPoll() {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedCode, setVotedCode] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("seckypay_country_vote");
    if (saved) {
      setVotedCode(saved);
      setHasVoted(true);
      setCountries(prev => prev.map(c => c.code === saved ? { ...c, votes: c.votes + 1 } : c));
    }
  }, []);

  const totalVotes = countries.reduce((sum, c) => sum + c.votes, 0);

  const handleVote = (code: string) => {
    if (hasVoted) return;
    setVotedCode(code);
    setHasVoted(true);
    localStorage.setItem("seckypay_country_vote", code);
    setCountries(prev => prev.map(c => c.code === code ? { ...c, votes: c.votes + 1 } : c));
  };

  const sortedCountries = [...countries].sort((a, b) => b.votes - a.votes);

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 border border-neutral-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-secky-blue-50 flex items-center justify-center">
          <MapPin size={24} className="text-secky-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-secky-blue-900">
            Où allons-nous nous installer ensuite ?
          </h3>
          <p className="text-sm text-neutral-500 font-medium mt-0.5">
            {totalVotes.toLocaleString("fr-FR")} votes · Votre avis compte
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {sortedCountries.map((country, index) => {
          const percentage = (country.votes / totalVotes) * 100;
          const isVoted = votedCode === country.code;
          const isFirst = index === 0;

          return (
            <button
              key={country.code}
              onClick={() => handleVote(country.code)}
              disabled={hasVoted}
              className={`w-full relative overflow-hidden rounded-xl p-3 transition-all ${
                isVoted 
                  ? "bg-secky-blue-50 border-2 border-secky-blue-600" 
                  : hasVoted 
                  ? "bg-neutral-50 border-2 border-transparent cursor-default" 
                  : "bg-neutral-50 border-2 border-transparent hover:border-secky-blue-300 hover:bg-white cursor-pointer"
              }`}
            >
              {/* Barre de progression en fond */}
              <div 
                className={`absolute inset-y-0 left-0 ${isVoted ? "bg-secky-blue-600/10" : isFirst && hasVoted ? "bg-secky-blue-600/5" : "bg-neutral-200/40"}`}
                style={{ width: `${percentage}%` }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div className="text-left">
                    <p className={`font-bold text-sm ${isVoted ? "text-secky-blue-900" : "text-neutral-700"}`}>
                      {country.name}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-medium">{country.code}</p>
                  </div>
                  {isFirst && hasVoted && (
                    <span className="text-[9px] font-bold text-status-warning bg-status-warning/10 px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
                      <TrendingUp size={10} /> En tête
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-500">
                    {percentage.toFixed(1)}%
                  </span>
                  {isVoted && <CheckCircle2 size={18} className="text-secky-blue-600" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <p className="text-xs text-center text-status-success font-bold mt-4 flex items-center justify-center gap-1">
          <CheckCircle2 size={14} /> Merci pour votre vote !
        </p>
      )}
      {!hasVoted && (
        <p className="text-xs text-center text-neutral-400 font-medium mt-4">
          Cliquez sur un pays pour voter
        </p>
      )}
    </div>
  );
}