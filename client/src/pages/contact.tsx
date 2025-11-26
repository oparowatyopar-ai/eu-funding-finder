import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const advisors = [
  {
    id: "adriano",
    name: "Adriano Orkisz",
    role: "Doradca ds. finansowania i dotacji UE",
    image: "https://i.imgur.com/rqr6gpm.png",
    phone: "455 514 518",
    email: "adriano.orkisz@kancelaria-finansowa.com.pl",
    description: "Pomagam firmom w skutecznym pozyskaniu środków unijnych i krajowych. Wspólnie dobierzemy finansowanie dopasowane do Twojego biznesu.",
    initials: "AO"
  },
  {
    id: "krystian",
    name: "Krystian Skowroński",
    role: "Doradca ds. projektów europejskich",
    image: null,
    phone: "455 514 326",
    email: "krystian.skowronski@kancelaria-finansowa.com.pl",
    description: "Specjalizuję się w analizie dokumentacji i dopasowywaniu programów dotacyjnych do potrzeb przedsiębiorców.",
    initials: "KS"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-yellow-50/20 font-sans text-slate-900">
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            <span className="text-[#004494]">Kontakt</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Skontaktuj się z naszymi doradcami – pomożemy Ci znaleźć odpowiednie finansowanie dla Twojej firmy.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className="h-full border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                      {advisor.image ? (
                        <AvatarImage src={advisor.image} alt={advisor.name} className="object-cover" />
                      ) : (
                        <AvatarFallback className="bg-[#004494] text-3xl font-bold text-white">
                          {advisor.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <CardTitle className="text-2xl text-slate-900">{advisor.name}</CardTitle>
                  <CardDescription className="text-[#004494] font-medium text-base">
                    {advisor.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-slate-600 italic leading-relaxed border-l-4 border-[#FFD617] pl-4 py-2">
                    "{advisor.description}"
                  </p>
                  
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#004494]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-medium">Telefon</p>
                        <a 
                          href={`tel:${advisor.phone.replace(/\s/g, '')}`}
                          className="text-base font-semibold hover:text-[#004494] transition-colors"
                        >
                          {advisor.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#004494]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-medium">E-mail</p>
                        <a 
                          href={`mailto:${advisor.email}`}
                          className="text-sm font-semibold hover:text-[#004494] transition-colors break-all"
                        >
                          {advisor.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      asChild
                      className="flex-1 bg-[#004494] hover:bg-[#003370]"
                    >
                      <a href={`tel:${advisor.phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Zadzwoń
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      <a href={`mailto:${advisor.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Napisz
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Office Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-slate-100 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center text-slate-900">Informacje o biurze</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#004494]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Godziny pracy</p>
                    <p className="text-base font-semibold text-slate-900">Pon–Pt: 9:00–18:00</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#004494]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Lokalizacja</p>
                    <p className="text-base font-semibold text-slate-900">Imperador Solutions, Wrocław, Polska</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
