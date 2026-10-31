"use client";
import Link from "next/link";
import { Monitor, ArrowLeft } from "lucide-react";

export default function AdminMobileWarning() {
  return (
    <div className="md:hidden min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-secky-blue-50 rounded-full flex items-center justify-center mb-6 border border-secky-blue-100">
        <Monitor size={40} className="text-secky-blue-600" />
      </div>
      <h1 className="text-xl font-extrabold text-secky-blue-900 mb-2">Back-office PC uniquement</h1>
      <p className="text-sm text-neutral-500 font-medium mb-8 max-w-xs">
        L'espace Super Admin est conçu pour être utilisé sur un ordinateur pour garantir une expérience optimale.
      </p>
      <Link href="/dashboard" className="h-12 px-6 bg-secky-blue-600 text-white font-bold rounded-xl flex items-center justify-center shadow-lg shadow-secky-blue-600/30">
        <ArrowLeft size={18} className="mr-2" /> Retour à l'espace marchand
      </Link>
    </div>
  );
}