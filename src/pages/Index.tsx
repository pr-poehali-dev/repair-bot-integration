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
  status: 'new' | 'awaiting-confirmation' | 'in-progress' | 'completed';
  date: string;
  masterConfirmed?: boolean;
  supplierConfirmed?: boolean;
  masterName?: string;
  supplierName?: string;
}

interface Consultation {
  id: number;
  question: string;
  answer?: string;
  date: string;
}

interface Supplier {
  id: number;
  name: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('create');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [repairType, setRepairType] = useState('');
  const [description, setDescription] = useState('');
  const [consultationQuestion, setConsultationQuestion] = useState('');

  const [requests, setRequests] = useState<RepairRequest[]>([
    {
      id: 1,
      type: 'Сантехника',
      description: 'Течёт кран на кухне',
      status: 'awaiting-confirmation',
      date: '2026-02-05',
      masterConfirmed: true,
      supplierConfirmed: false,
      masterName: 'Иван Петров',
      supplierName: 'Аквасервис'
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
      'awaiting-confirmation': { label: 'Ожидание согласования', variant: 'secondary' as const },
      'in-progress': { label: 'В работе', variant: 'destructive' as const },
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
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
            <TabsTrigger value="suppliers" className="gap-2">
              <Icon name="Store" size={18} />
              Поставщики
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
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                    
                    {(request.masterName || request.supplierName) && (
                      <div className="border-t pt-3 space-y-2">
                        {request.masterName && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Icon name="UserCheck" size={16} className="text-muted-foreground" />
                              <span className="text-muted-foreground">Мастер:</span>
                              <span className="font-medium">{request.masterName}</span>
                            </div>
                            {request.masterConfirmed ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Icon name="CheckCircle" size={12} className="mr-1" />
                                Подтверждено
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Icon name="Clock" size={12} className="mr-1" />
                                Ожидание
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        {request.supplierName && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Icon name="Package" size={16} className="text-muted-foreground" />
                              <span className="text-muted-foreground">Поставщик:</span>
                              <span className="font-medium">{request.supplierName}</span>
                            </div>
                            {request.supplierConfirmed ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Icon name="CheckCircle" size={12} className="mr-1" />
                                Подтверждено
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Icon name="Clock" size={12} className="mr-1" />
                                Ожидание
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="consultation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Консультация специалиста</CardTitle>
                <CardDescription>
                  Специалист поможет с консультацией и отправит заявку мастеру и поставщику
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-blue-900">Как работает процесс:</p>
                      <ol className="list-decimal list-inside space-y-1 text-blue-700">
                        <li>Вы задаёте вопрос о проблеме</li>
                        <li>Специалист консультирует и создаёт заявку</li>
                        <li>Заявка отправляется мастеру и поставщику материалов</li>
                        <li>Как только оба подтверждают — заявка переходит в работу</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваш вопрос</label>
                  <Textarea
                    placeholder="Например: Течёт кран на кухне, что делать?"
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
                  Отправить вопрос специалисту
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

          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>База поставщиков материалов</CardTitle>
                <CardDescription>
                  Проверенные поставщики для быстрой доставки материалов
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { id: 1, name: 'СтройМатериалы Pro', category: 'Отделка', phone: '+7 (495) 123-45-67', email: 'info@stroypro.ru', address: 'Москва, ул. Строительная, 10', rating: 4.8 },
                { id: 2, name: 'Электромир', category: 'Электрика', phone: '+7 (495) 234-56-78', email: 'sales@electromir.ru', address: 'Москва, пр. Электриков, 25', rating: 4.9 },
                { id: 3, name: 'Аквасервис', category: 'Сантехника', phone: '+7 (495) 345-67-89', email: 'order@aquaservis.ru', address: 'Москва, ул. Водопроводная, 5', rating: 4.7 },
                { id: 4, name: 'МебельЛюкс', category: 'Мебель', phone: '+7 (495) 456-78-90', email: 'info@mebellux.ru', address: 'Москва, ул. Мебельная, 15', rating: 4.6 },
                { id: 5, name: 'КраскиПро', category: 'Малярные материалы', phone: '+7 (495) 567-89-01', email: 'sale@kraskipro.ru', address: 'Москва, ул. Малярная, 12', rating: 4.7 },
                { id: 6, name: 'ШпаклёвкаЦентр', category: 'Малярные материалы', phone: '+7 (495) 678-90-12', email: 'info@shpaklevka.ru', address: 'Москва, пр. Отделочников, 8', rating: 4.5 },
                { id: 7, name: 'МастерОтделки', category: 'Малярные материалы', phone: '+7 (495) 789-01-23', email: 'order@masterotdelki.ru', address: 'Москва, ул. Ремонтная, 20', rating: 4.8 },
                { id: 8, name: 'ЛинолеумМаркет', category: 'Напольные покрытия', phone: '+7 (495) 890-12-34', email: 'sales@linomarket.ru', address: 'Москва, ул. Напольная, 15', rating: 4.6 },
                { id: 9, name: 'ПаркетГрупп', category: 'Напольные покрытия', phone: '+7 (495) 901-23-45', email: 'info@parketgroup.ru', address: 'Москва, пр. Паркетный, 30', rating: 4.9 },
                { id: 10, name: 'ЛаминатСтиль', category: 'Напольные покрытия', phone: '+7 (495) 012-34-56', email: 'contact@laminatstyle.ru', address: 'Москва, ул. Ламинатная, 5', rating: 4.7 },
                { id: 11, name: 'ОбоиДекор', category: 'Обои', phone: '+7 (495) 123-45-78', email: 'sale@oboidecor.ru', address: 'Москва, ул. Обойная, 18', rating: 4.8 },
                { id: 12, name: 'СтильОбоев', category: 'Обои', phone: '+7 (495) 234-56-89', email: 'info@stiloboev.ru', address: 'Москва, пр. Декоративный, 22', rating: 4.6 },
                { id: 13, name: 'ДвериПремиум', category: 'Двери', phone: '+7 (495) 345-67-90', email: 'order@dveripremium.ru', address: 'Москва, ул. Дверная, 40', rating: 4.9 },
                { id: 14, name: 'ДверьМастер', category: 'Двери', phone: '+7 (495) 456-78-01', email: 'sales@dvermaster.ru', address: 'Москва, пр. Столярный, 25', rating: 4.7 }
              ].map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {supplier.category}
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Icon name="Star" size={14} className="text-yellow-600 fill-yellow-600" />
                        <span className="text-sm font-semibold text-yellow-700">{supplier.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Phone" size={14} className="text-muted-foreground" />
                      <a href={`tel:${supplier.phone}`} className="hover:text-primary transition-colors">
                        {supplier.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Mail" size={14} className="text-muted-foreground" />
                      <a href={`mailto:${supplier.email}`} className="hover:text-primary transition-colors truncate">
                        {supplier.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Icon name="MapPin" size={14} className="text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{supplier.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}