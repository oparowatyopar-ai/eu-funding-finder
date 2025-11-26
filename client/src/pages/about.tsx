import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "430+",
    label: "Obsłużonych firm",
    color: "text-blue-600"
  },
  {
    icon: TrendingUp,
    value: "€50M+",
    label: "Pozyskanych środków",
    color: "text-emerald-600"
  },
  {
    icon: Award,
    value: "100%",
    label: "Zaangażowania",
    color: "text-purple-600"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-yellow-50/20 font-sans text-slate-900">
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
          >
            <span className="text-[#004494]">O nas</span>
          </motion.h1>
        </div>

        {/* Main Content */}
        <div className="mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-slate-100 bg-white shadow-md">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                  <p>
                    Jesteśmy zespołem doradców specjalizujących się w pozyskiwaniu dotacji i pożyczek unijnych dla przedsiębiorców w całej Polsce i Europie.
                  </p>
                  
                  <p>
                    Pomogliśmy już ponad <span className="font-bold text-[#004494]">430 firmom</span> rozwinąć działalność, wdrożyć nowe technologie i przejść cyfrową transformację.
                  </p>
                  
                  <p>
                    Łączna wartość pozyskanych przez nas środków przekroczyła <span className="font-bold text-[#004494]">50 milionów euro</span>.
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xl font-semibold text-[#004494] italic">
                      Naszą misją jest prosty dostęp do finansowania dla każdego przedsiębiorcy — bez biurokracji, bez stresu.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 ${stat.color} mb-4`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="border-t-4 border-t-[#FFD617] border-slate-100 bg-white shadow-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Dlaczego my?</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Indywidualne podejście do każdego klienta",
                  "Kompleksowa obsługa od A do Z",
                  "Doświadczony zespół ekspertów",
                  "Wsparcie na każdym etapie aplikacji",
                  "Najwyższe standardy obsługi",
                  "Bezpłatna konsultacja wstępna"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
