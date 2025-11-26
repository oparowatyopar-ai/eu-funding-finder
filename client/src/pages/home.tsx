import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Euro, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  Briefcase, 
  Leaf, 
  GraduationCap, 
  Cpu, 
  TrendingUp,
  Phone,
  Upload,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Funding Offers Data
const offers = [
  {
    id: 1,
    title: "Pożyczka dla MŚP – oprocentowanie 2%",
    description: "Krótkoterminowe wsparcie inwestycyjne dla małych i średnich przedsiębiorstw.",
    tags: ["Pożyczka", "UE", "Rozwój"],
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Dotacja na rozwój e-commerce – do 70% bezzwrotna",
    description: "Program wspierający firmy inwestujące w digitalizację i sprzedaż online.",
    tags: ["Dotacja", "Cyfryzacja", "UE"],
    icon: Euro,
    color: "text-emerald-600"
  },
  {
    id: 3,
    title: "Pożyczka Inwestycyjna 1-3% w skali roku",
    description: "Finansowanie inwestycji rozwojowych i zakupu środków trwałych.",
    tags: ["Pożyczka", "Inwestycje", "Rozwój"],
    icon: Cpu,
    color: "text-purple-600"
  },
  {
    id: 4,
    title: "Pożyczka dla przedsiębiorców na dostępność 0,15% rocznie",
    description: "Korzystne finansowanie do 1 000 000 zł na projekty związane z dostępnością.",
    tags: ["Pożyczka", "Dostępność", "UE"],
    icon: Leaf,
    color: "text-green-600"
  },
  {
    id: 5,
    title: "Dotacja na szkolenia pracowników – 100% zwrotu",
    description: "Dofinansowanie szkoleń i podnoszenia kwalifikacji pracowników.",
    tags: ["Szkolenia", "Kadry", "Dotacja"],
    icon: GraduationCap,
    color: "text-orange-600"
  },
  {
    id: 6,
    title: "Dotacja ZUS 2026 do 300 000 zł na poprawę BHP",
    description: "Wsparcie finansowe na inwestycje w bezpieczeństwo i higienę pracy.",
    tags: ["Dotacja", "BHP", "ZUS"],
    icon: Briefcase,
    color: "text-indigo-600"
  }
];

// Advisors Data
const advisors = [
  {
    id: "adriano",
    name: "Adriano Orkisz",
    role: "Senior Advisor ds. finansowania UE",
    image: "https://i.imgur.com/rqr6gpm.png",
    description: "Pomogę Ci dobrać najlepszy program i przygotować dokumenty, żeby kasa z Unii przyszła jak najszybciej 💸",
    initials: "AO",
    phone: "455 514 518"
  },
  {
    id: "krystian",
    name: "Krystian Skowroński",
    role: "Doradca ds. projektów europejskich",
    image: null, // No image, use initials
    description: "Pomogę w szybkiej analizie Twojej sytuacji i dopasowaniu odpowiedniego programu finansowania.",
    initials: "KS",
    phone: "455 514 326"
  }
];

const companyTypes = [
  { id: "jdg", label: "Jednoosobowa działalność gospodarcza" },
  { id: "spzoo", label: "Spółka z o.o." },
  { id: "komandytowa", label: "Spółka komandytowa" },
  { id: "jawna", label: "Spółka jawna" },
  { id: "partnerska", label: "Spółka partnerska" },
  { id: "cywilna", label: "Spółka cywilna" },
  { id: "ryczalt", label: "Ryczałt" },
];

const getRequiredDocs = (type: string) => {
  switch (type) {
    case "jdg":
      return ["PIT 2023", "PIT 2024", "KPIR 2023", "KPIR 2024", "Bieżące 2025"];
    case "spzoo":
    case "komandytowa":
      return ["RZiS 2023–2025", "CIT 2023–2024", "Bilans 2023–2025"];
    case "ryczalt":
      return ["PIT 2023–2025", "Ewidencja Przychodów 2023–2024"];
    case "jawna":
    case "partnerska":
    case "cywilna":
      return ["KPiR / RZiS (zależnie od księgowości)"];
    default:
      return [];
  }
};

const additionalDocs = [
  "Tabela amortyzacyjna: 2023–2025",
  "VAT-owiec: deklaracja VAT-7 2023–2025 + podsumowanie wynagrodzeń"
];

export default function Home() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<typeof advisors[0] | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const advisorSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Form State
  const [companyType, setCompanyType] = useState("jdg");
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consents, setConsents] = useState({
    dataProcessing: false,
    electronicDelivery: false,
    authorized: false
  });

  const handleContactClick = () => {
    // Adriano (advisors[0]) has 75% chance, Krystian (advisors[1]) has 25% chance
    const randomAdvisor = Math.random() < 0.75 ? advisors[0] : advisors[1];
    setSelectedAdvisor(randomAdvisor);
    setTimeout(() => {
      advisorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitDocuments = async () => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append("advisorId", selectedAdvisor?.id || "");
      formData.append("companyType", companyType);
      formData.append("comments", comments);
      formData.append("consents", JSON.stringify(consents));
      
      // Append all files
      files.forEach(file => {
        formData.append("files", file);
      });

      // Send to backend API
      const response = await fetch("/api/upload-documents", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Błąd podczas wysyłania dokumentów");
      }

      // Success! Show preview URL in console if using Ethereal (for testing)
      if (data.previewUrl) {
        console.log("Preview URL:", data.previewUrl);
      }

      setIsSubmitting(false);
      setIsUploadModalOpen(false);
      setIsSuccessModalOpen(true);
      
      // Reset form
      setCompanyType("jdg");
      setFiles([]);
      setComments("");
      setConsents({
        dataProcessing: false,
        electronicDelivery: false,
        authorized: false
      });

    } catch (error: any) {
      setIsSubmitting(false);
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się wysłać dokumentów",
        variant: "destructive"
      });
      console.error("Upload error:", error);
    }
  };

  const isFormValid = consents.dataProcessing && consents.electronicDelivery && consents.authorized && files.length > 0;

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Intro */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            <span className="text-[#004494]">Fundusze Europejskie</span> dla Twojej firmy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Znajdź odpowiednie wsparcie finansowe i rozwiń swój biznes dzięki środkom z Unii Europejskiej.
          </p>
        </div>

        {/* Funding Offers Section */}
        <section className="mb-24">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-8 w-1 bg-[#FFD617] rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Dostępne programy finansowania</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group h-full border-slate-100 bg-white shadow-sm transition-all hover:border-blue-100 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <div className={`rounded-lg bg-slate-50 p-2.5 ${offer.color}`}>
                        <offer.icon className="h-6 w-6" />
                      </div>
                      <div className="flex gap-1">
                        {offer.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-normal border-transparent"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-slate-900 group-hover:text-[#004494] transition-colors">
                      {offer.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600">
                      {offer.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={handleContactClick}
                      className="w-full bg-[#004494] text-white hover:bg-[#003370] shadow-sm group-hover:shadow transition-all"
                    >
                      Skontaktuj się z doradcą
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Advisor Section */}
        <div ref={advisorSectionRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {selectedAdvisor && (
              <motion.div
                key={selectedAdvisor.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mx-auto max-w-3xl"
              >
                <Card className="overflow-hidden border-t-4 border-t-[#FFD617] shadow-lg bg-white">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Advisor Image/Avatar Area */}
                      <div className="flex md:w-1/3 flex-col items-center justify-center bg-slate-50 p-8 text-center border-b md:border-b-0 md:border-r border-slate-100">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-md mb-4">
                          {selectedAdvisor.image ? (
                            <AvatarImage src={selectedAdvisor.image} alt={selectedAdvisor.name} className="object-cover" />
                          ) : (
                            <AvatarFallback className="bg-[#004494] text-2xl font-bold text-white">
                              {selectedAdvisor.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <h3 className="font-bold text-lg text-slate-900">{selectedAdvisor.name}</h3>
                        <p className="text-sm text-[#004494] font-medium mb-2">{selectedAdvisor.role}</p>
                        <p className="flex items-center justify-center gap-2 text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">
                          <Phone className="h-3 w-3" /> {selectedAdvisor.phone}
                        </p>
                      </div>

                      {/* Advisor Content Area */}
                      <div className="flex flex-1 flex-col justify-center p-8">
                        <div className="mb-6 relative">
                          <div className="absolute -top-2 -left-2 text-slate-200">
                            <MessageCircle className="h-8 w-8 opacity-20" />
                          </div>
                          <p className="relative z-10 text-lg text-slate-700 italic leading-relaxed">
                            "{selectedAdvisor.description}"
                          </p>
                        </div>
                        
                        <Separator className="mb-6" />
                        
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Button 
                            onClick={() => setIsCallModalOpen(true)}
                            className="flex-1 gap-2 bg-[#004494] hover:bg-[#003370] h-12 text-base"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Porozmawiaj z doradcą
                          </Button>
                          <Button 
                            onClick={() => setIsUploadModalOpen(true)}
                            variant="outline" 
                            className="flex-1 gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 h-12 text-base"
                          >
                            <FileText className="h-4 w-4" />
                            Wyślij dokumenty
                          </Button>
                        </div>
                        <p className="mt-4 text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Dostępny online
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call Modal */}
        <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-[#004494]">Skontaktuj się z doradcą</DialogTitle>
              <DialogDescription className="text-center">
                Kliknij poniżej, aby zadzwonić do wybranego eksperta.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-6 py-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                {selectedAdvisor?.image ? (
                  <AvatarImage src={selectedAdvisor.image} alt={selectedAdvisor.name} />
                ) : (
                  <AvatarFallback className="bg-[#004494] text-xl font-bold text-white">
                    {selectedAdvisor?.initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-lg text-slate-900">{selectedAdvisor?.name}</h3>
                <p className="text-2xl font-bold text-[#004494]">{selectedAdvisor?.phone}</p>
              </div>
              <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 h-12 text-lg" asChild>
                <a href={`tel:${selectedAdvisor?.phone?.replace(/\s/g, '')}`}>
                  <Phone className="h-5 w-5" /> Zadzwoń teraz
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Document Upload Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="sm:max-w-2xl h-[90vh] overflow-hidden flex flex-col p-0">
            <div className="p-6 pb-0">
              <DialogHeader>
                <DialogTitle className="text-[#004494]">Wyślij dokumenty</DialogTitle>
                <DialogDescription>
                  Wypełnij formularz i załącz wymagane dokumenty, aby rozpocząć proces weryfikacji.
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <ScrollArea className="flex-1 p-6 pt-4">
              <div className="space-y-6">
                {/* Company Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Forma prawna</Label>
                  <RadioGroup value={companyType} onValueChange={setCompanyType} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {companyTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer [&:has([data-state=checked])]:border-[#004494] [&:has([data-state=checked])]:bg-blue-50/30">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="cursor-pointer flex-1">{type.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Required Documents List */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-sm text-slate-700">
                    <FileText className="h-4 w-4 text-[#004494]" />
                    Wymagane dokumenty dla wybranej formy:
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {getRequiredDocs(companyType).map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="bg-blue-100 text-[#004494] rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                        {doc}
                      </li>
                    ))}
                    {additionalDocs.map((doc, i) => (
                      <li key={`add-${i}`} className="flex items-start gap-2 opacity-80">
                        <span className="bg-slate-200 text-slate-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">+</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* File Upload */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Załącz pliki</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-[#004494] hover:bg-blue-50/10 transition-colors">
                    <input 
                      type="file" 
                      id="file-upload" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="h-10 w-10 bg-blue-50 text-[#004494] rounded-full flex items-center justify-center mb-2">
                        <Upload className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-slate-700">Kliknij, aby dodać pliki</span>
                      <span className="text-xs text-slate-400">PDF, JPG, PNG, XLS (max 20 plików)</span>
                    </label>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-md shadow-sm">
                          <span className="text-sm truncate max-w-[200px] md:max-w-[300px]">{file.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-base font-semibold">Uwagi / dodatkowe informacje</Label>
                  <Textarea 
                    id="comments" 
                    placeholder="Wpisz dodatkowe informacje..." 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Consents */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="dataProcessing" 
                      checked={consents.dataProcessing}
                      onCheckedChange={(checked) => setConsents(prev => ({ ...prev, dataProcessing: checked as boolean }))}
                    />
                    <label htmlFor="dataProcessing" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5">
                      Wyrażam zgodę na przetwarzanie danych osobowych niezbędnych do obsługi wniosku.
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="electronicDelivery" 
                      checked={consents.electronicDelivery}
                      onCheckedChange={(checked) => setConsents(prev => ({ ...prev, electronicDelivery: checked as boolean }))}
                    />
                    <label htmlFor="electronicDelivery" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5">
                      Wyrażam zgodę na przesyłanie dokumentów drogą elektroniczną.
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="authorized" 
                      checked={consents.authorized}
                      onCheckedChange={(checked) => setConsents(prev => ({ ...prev, authorized: checked as boolean }))}
                    />
                    <label htmlFor="authorized" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5">
                      Oświadczam, że jestem uprawniony do wysyłania dokumentów w imieniu firmy.
                    </label>
                  </div>

                  <div className="text-xs text-slate-400 pl-7">
                    Zapoznaj się z <a href="#" className="text-[#004494] hover:underline">Polityką prywatności</a>.
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-6 border-t bg-slate-50">
              <Button 
                onClick={handleSubmitDocuments} 
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-[#004494] hover:bg-[#003370] h-12 text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wysyłanie...
                  </>
                ) : (
                  "Wyślij dokumenty"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
          <DialogContent className="sm:max-w-md text-center">
            <div className="flex justify-center mb-4 mt-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Dziękujemy!</DialogTitle>
              <DialogDescription className="text-center text-base mt-2">
                Twoje dokumenty zostały przesłane. Skontaktujemy się w ciągu 48 godzin.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 sm:justify-center">
              <Button onClick={() => setIsSuccessModalOpen(false)} className="bg-[#004494] hover:bg-[#003370] w-full sm:w-auto min-w-[120px]">
                Zamknij
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
  );
}
