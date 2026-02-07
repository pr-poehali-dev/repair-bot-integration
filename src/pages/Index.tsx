import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface RepairRequest {
  id: number;
  type: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed';
  date: string;
}

interface Consultation {
  id: number;
  question: string;
  answer?: string;
  date: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('create');
  const [repairType, setRepairType] = useState('');
  const [description, setDescription] = useState('');
  const [consultationQuestion, setConsultationQuestion] = useState('');

  const [requests, setRequests] = useState<RepairRequest[]>([
    {
      id: 1,
      type: 'Сантехника',
      description: 'Течёт кран на кухне',
      status: 'in-progress',
      date: '2026-02-05'
    },
    {
      id: 2,
      type: 'Электрика',
      description: 'Не работает розетка в спальне',
      status: 'new',
      date: '2026-02-06'
    }
  ]);

  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: 1,
      question: 'Сколько стоит замена смесителя?',
      answer: 'От 2000₽, в зависимости от модели смесителя',
      date: '2026-02-04'
    }
  ]);

  const handleCreateRequest = () => {
    if (!repairType || !description) return;
    
    const newRequest: RepairRequest = {
      id: requests.length + 1,
      type: repairType,
      description,
      status: 'new',
      date: new Date().toISOString().split('T')[0]
    };
    
    setRequests([newRequest, ...requests]);
    setRepairType('');
    setDescription('');
  };

  const handleAskQuestion = () => {
    if (!consultationQuestion) return;
    
    const newConsultation: Consultation = {
      id: consultations.length + 1,
      question: consultationQuestion,
      date: new Date().toISOString().split('T')[0]
    };
    
    setConsultations([newConsultation, ...consultations]);
    setConsultationQuestion('');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Новая', variant: 'default' as const },
      'in-progress': { label: 'В работе', variant: 'secondary' as const },
      completed: { label: 'Выполнена', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">РемонтБот</h1>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="User" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="create" className="gap-2">
              <Icon name="Plus" size={18} />
              Создать заявку
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Icon name="ClipboardList" size={18} />
              Мои заявки
            </TabsTrigger>
            <TabsTrigger value="consultation" className="gap-2">
              <Icon name="MessageCircle" size={18} />
              Консультация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Создать заявку на ремонт</CardTitle>
                <CardDescription>
                  Мастер и материалы приедут по одному требованию
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип работ</label>
                  <Select value={repairType} onValueChange={setRepairType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип работ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Сантехника">
                        <div className="flex items-center gap-2">
                          <Icon name="Droplet" size={16} />
                          Сантехника
                        </div>
                      </SelectItem>
                      <SelectItem value="Электрика">
                        <div className="flex items-center gap-2">
                          <Icon name="Zap" size={16} />
                          Электрика
                        </div>
                      </SelectItem>
                      <SelectItem value="Отделка">
                        <div className="flex items-center gap-2">
                          <Icon name="Paintbrush" size={16} />
                          Отделка
                        </div>
                      </SelectItem>
                      <SelectItem value="Мебель">
                        <div className="flex items-center gap-2">
                          <Icon name="Armchair" size={16} />
                          Сборка мебели
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Описание проблемы</label>
                  <Textarea
                    placeholder="Опишите, что нужно сделать..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleCreateRequest} 
                  className="w-full"
                  size="lg"
                  disabled={!repairType || !description}
                >
                  <Icon name="Send" size={18} />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="ClipboardList" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">У вас пока нет заявок</p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{request.type}</CardTitle>
                        <CardDescription className="text-xs">
                          <Icon name="Calendar" size={14} className="inline mr-1" />
                          {new Date(request.date).toLocaleDateString('ru-RU')}
                        </CardDescription>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="consultation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Задать вопрос мастеру</CardTitle>
                <CardDescription>
                  Получите консультацию перед созданием заявки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваш вопрос</label>
                  <Textarea
                    placeholder="Например: Сколько стоит замена розетки?"
                    value={consultationQuestion}
                    onChange={(e) => setConsultationQuestion(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={handleAskQuestion} 
                  className="w-full"
                  disabled={!consultationQuestion}
                >
                  <Icon name="MessageCircle" size={18} />
                  Отправить вопрос
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {consultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Icon name="HelpCircle" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{consultation.question}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {new Date(consultation.date).toLocaleDateString('ru-RU')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {consultation.answer && (
                    <CardContent>
                      <div className="flex items-start gap-3 bg-accent/10 p-4 rounded-lg">
                        <Icon name="MessageSquare" size={18} className="text-accent mt-1" />
                        <p className="text-sm">{consultation.answer}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
