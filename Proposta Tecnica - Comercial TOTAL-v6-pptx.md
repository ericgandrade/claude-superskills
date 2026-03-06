## Slide 1: Proposta de Implantação, Serviços Gerenciados e Hospedagem

## Slide 2: Termo de confidencialidade
- O conteúdo deste documento inclui nossa abordagem e material confidencial de propriedade da Avanade do Brasil Ltda. (“Avanade”), devendo ser usado exclusivamente para avaliar a nossa capacitação técnica para a prestação de serviços à TOTAL Combustíveis no âmbito do serviço denominado “Cloud Managed Services” (CMS) e Microsoft Cloud - Azure Hosting (Azure).
- Este material é estritamente confidencial e não poderá ser acessado por pessoas, dentro ou fora da TOTAL, que não estejam diretamente ligadas ao processo de avaliação ou ser utilizado para outros fins que não a própria avaliação.
- Sob nenhuma hipótese, outra empresa que não a TOTAL, pode ter acesso a estes materiais sem a autorização explícita da Avanade.
- Esta estimativa faz referência a nomes, marcas e logos que podem ser detidas por terceiros. O uso de tais marcas comerciais aqui não é uma afirmação de propriedade de tais marcas pela Avanade e não se destina a representar ou sugerir a existência de uma associação entre a Avanade e os legítimos proprietários de tais marcas comerciais.
- Ao final do processo de avaliação, e caso esta abordagem não seja aceita pela TOTAL, ela deverá ser retornada a Avanade ou ser destruída.

## Slide 3: Sobre Avanade
- Avanade tem mais de 28.000 profissionais alocados em mais de 20 países. A Avanade foi fundada em 2000 como joint venture entre a Accenture e a Microsoft Corporation. Nossos serviços ajudam os clientes a melhorar o desempenho, a produtividade e as vendas em todas as categorias da indústria, e capacitar aqueles em que mais precisa: Os Colaboradores.
- Nós trabalhamos em conjunto com o cliente para gerar valor ao negócio. E é assim que construímos a inovação: descomplicando tarefas, tornando o dia a dia de nossos clientes mais dinâmico, produtivo e inteligente.
- Avanade é uma consultoria global de soluções de tecnologia especializada em plataforma Microsoft. Usamos nosso amplo conhecimento da indústria para buscar e entregar respostas inovadoras para os negócios.

## Slide 4: Nosso Entendimento – Solução Proposta
- Solução Proposta
- Provisionar uma infraestrutura que proporcione  elasticidade, sazonalidade e escala para o novo ERP, sistema de gestão fiscal e tributária e folha de pagamento;
- Implementar o ambiente descrito em uma infraestrutura disponível e com SLA de atendimento que suporte às necessidades da TOTAL estabelecidas nesta proposta;
- Prover meio de acesso seguro aos usuários da TOTAL;
- Gerenciar e administrar o ambiente pró ativamente e de forma a seguir as práticas de segurança
- Benefícios esperados
- Cloud Managed Services
- Conforme informado, a TOTAL, está em busca contínua por um modelo de crescimento sustentável e direcionado por sua visão de se tornar a quinta maior distribuidora de combustíveis líquidos do Brasil.
- Neste contexto, a TOTAL pretende realizar a reestruturação do seu Centro de Serviços Compartilhados (CSC) e de migrar a plataforma de Gestão (ERP) para o ambiente SAP em uma Infraestrutura que suporte aumento e redução de escala, redução do Time-to-Market e garantia de SLA.
- A seguir descreveremos um pouco do nosso entendimento de como a Avanade pode suportar nesse desafio:
- Suporte técnico e consultivo especializado para implantação de novos workloads;
- Gestão e transformação do modelo operacional de TI como serviço;
- Experiência e melhores práticas locais e globais;
- DNA de consultoria da Avanade contendo grande conhecimento de mercado;
- Serviço de nuvem confiável, segura e certificada;
- Infraestrutura homologada e certificada para Linux e SAP;
- Alta disponibilidade, previsão orçamentaria e pagamento sob consumo;
- Infraestrutura que provê elasticidade, escala e  suporte à sazonalidade;

## Slide 5: Arquitetura da SoluçãoDesenho de Infraestrutura
- Abaixo está ilustrado o desenho de arquitetura previsto para implantação da infraestrutura. Os componentes de arquitetura da solução no Azure serão formalmente reavaliados na fase de implantação das soluções.
- Ambiente hospedado no datacenter do Azure dos EUA com a menor latência
- Conexão VPN Alta Performance ativa-ativa com Throughtput de até 200Mbps e até 30 túneis IPSEC (Route Based);
- Todos os servidores com redundância de discos (com 3 cópias);
- Servidores críticos com backup diário e retenção com limite de até 30 TB;
- Disponibilidade de 99,9% de infraestrutura e de máquinas com discos SSD descontado as manutenções programadas;
- Proteção de firewall entre todas as camadas da aplicação e ambientes;
- Automação para ligamento e desligamento de parte do ambiente em horários de quantidade reduzida de consumo;
- Monitoração do ambiente através do OMS;
- O tráfego de rede estimado para 340 usuários utilizando a solução desenhada na proposta técnica Accenture é de 30Mbps para as interfaces de usuário com SAP. Para esse cálculo foi considerado um percentual de concorrência de tráfego entre 10% e 25%;
- Características da Solução

## Slide 6: Requisitos técnicosInfraestrutura dimensionada – Ambiente Produção
- Considerações:
- Será provisionado um dispositivo VPN dinâmico que suporta taxa de transferência com throughtput de até 200Mbps e até 30 túneis IPSEC (Route Based).  Caso a TOTAL necessitar de mais de uma conexão com  rota estática (Policy Based) novos dispositivos deverão ser contratados
- A previsão transações de Storage para o ambiente de produção  e Dev & QA é de 4088/ mês
- O estimado volume de dados de saída do datacenter é de 320 GB / mês
- O licenciamento de Sistema Operacional, aplicações e banco de dados deverá ser fornecido pela TOTAL
- A especificação técnica foi baseada no sizing dos equipamentos fornecidos pelos fabricantes dos softwares e disponibilizados publicamente em seus respectivos sites, e utilizado como referência para a implantação do ambiente da TOTAL, conforme descrito abaixo:

## Slide 7: Requisitos técnicosInfraestrutura dimensionada – Ambiente DEV & QA
- A especificação técnica foi baseado no sizing dos equipamentos fornecidos pelos fabricantes dos softwares e disponibilizados publicamente em seus respectivos sites, e utilizado como referência para a implantação do ambiente da TOTAL, conforme descrito abaixo:
- Considerações:
- Será provisionado um dispositivo VPN dinâmico que suporta taxa de transferência com throughtput de até 200Mbps e até 30 túneis IPSEC (Route Based).  Caso a TOTAL necessitar de mais de uma conexão com  rota estática (Policy Based) novos dispositivos deverão ser contratados
- A previsão transações de Storage para o ambiente de produção  e Dev & QA é de 3200/ mês
- O estimado volume de dados de saída do datacenter é de 280 GB / mês
- O licenciamento de Sistema Operacional, aplicações e banco de dados deverá ser fornecido pela TOTAL

## Slide 8: Infraestrutura referência para cada faseCrescimento da Infraestrutura
- A Infraestrutura referência para suportar a solução está baseada no cronograma de implantação do projeto de implantação do SAP S/4 HANA, LG, Mastersaf One Source, DW e DFE e o crescimento da demanda (conforme a evolução do projeto):

## Slide 9: Infraestrutura referência para cada faseCrescimento da Infraestrutura
- Detalhamento técnico do ambiente, considerando o ramp-up:

## Slide 10: Escopo de ServiçosEtapas de implantação e operação da solução
- Operação
- Preparação dos ambientes de DEV, QA e Produção no Azure
- ImplantaçãoPlanej., Análise, Des., Const.
- Setup
- Operação
- Melhoria Contínua
- Gestão de serviços no Azure
- Monitoração do Ambiente
- Managed Services
- Implantação
- Hospedagem

## Slide 11: Implantação

## Slide 12: Atividades de Implantação
- O ACM provê metodologias de entrega de soluções para vários dos tipos comuns de serviços em que a Avanade é envolvida.
- (ACM) Métodos Conectados da Avanade– ACM é a metodologia de gerenciamento do ciclo de vida do serviço e entrega
  - Analyse : avaliação da infraestrutura necessária, entendimento e detalhamento técnico dos componentes e requisitos da solução.
  - Design: detalhamento do plano de projeto da implantação (contendo a estratégia, as fases, os requisitos técnicos da solução, o desenho de topologia da infraestrutura no datacenter e o cronograma de atividades).
  - Build: configuração dos requisitos técnicos de infraestrutura básica para suportar as soluções, tais como conectividade do datacenter com o ambiente (porta de conexão), preparação dos equipamentos internos de datacenter, validação dos componentes e configurações.
  - Deploy: provisionamento do ambiente (criação das virtual neworks, subnets, network security groups, contas de storage e recursos segregados por ambientes, instalação das máquinas – sistemas operacionais e segurança – firewalls) de acordo com a topologia revisada.
  - Test: execução dos testes de acesso e funcionamento do ambiente.

## Slide 13: Escopo de implantação de infraestrutura
- Preparation & Blueprint
- Realization
- Support pos-go-live
- Planejamento
- Análise
- Desenho
- Construção
- Testes
- Suporte
- Ao final de cada fase as partes deverão confirmar se as estimativas e custos serão mantidas nas fase subsequente. Em caso de qualquer alteração, fica desde já estabelecido que as partes deverão formalizar complemento à presente proposta de forma a refletir os novos parâmetros, antes da execução dos trabalhos.

## Slide 14: Abordagem de ImplantaçãoPlano de Implantação e Operação do ambiente Azure
- Provisionamento de Infraestrutura Produção

## Slide 15: Operação – Serviços Gerenciados Cloud Managed Services

## Slide 16: Escopo de ServiçosNossa proposição para serviços gerenciados de Azure para a TOTAL
- Cloud PaaS Managed Services
- Cloud IaaS Managed Services
- Plataforma e aplicativos de negócio operando de forma otimizada e disponíveis para as pessoas que precisam deles.
- Infraestrutura de nuvem robusta e escalável, proporcionando segurança e alta-disponibilidade.
- Escopo de serviços:
- Serviços de administração Nivel 2
- Suporte  24x5 para Dev & QA
- Suporte 24x7 para ambiente Produção on call em Feriados nacionais e finais de semana
- Aplicações bult-in na nuvem
- Principais atividades:
- Identity Management
- Release Management
- Event Management
- Problem Resolution
- Incident Management
- Escopo de serviços:
- Serviços de administração Nivel 2
- Suporte  24x5 para Dev & QA
- Suporte 24x7 para ambiente Produção on call em Feriados nacionais e finais de semana
- SLA de Atendimento
- Principais atividades:
- Administração de VMs (Config, Size, Resource)
- Monitoramento, Patch, Backup
- Provisionamento e de-provisionamento
- Monitoramento do consumo
- Auto-escala (vertical e horizontal)

## Slide 17
- 17
- Solução PropostaEscopo dos Serviços Gerenciados– Catálogo de Serviços
- *Requisições de serviço que envolvem a Arquitetura estão fora do escopo de Cloud Managed Services e devem ser contratados sob demanda

## Slide 18: Abordagem da entrega da soluçãoModelo Operacional

## Slide 19: Abordagem da entrega da soluçãoFluxo de Atendimento
- Para incidentes, a equipe de operação responde e resolve incidentes na modalidade 24x7 on call(proativo ou reativo). Recebendo tickets através de sistema interno (proativo) e do sistema de tickets da TOTAL (reativo). Para incidentes reativos, a TOTAL deve fornecer licença e meio de acesso ao sistema de tickets. As solicitações de serviço serão analisadas (esforço e viabilidade técnica) durante a janela de horário comercial e negociadas para execução.
- Serviços – Service Request	Plantão(24x5)
- INCIDENTS	SUPPORT 24x7 (on call)
- Área de
- Negócios
- Avanade Service
- Management
- Solicitação
- Atualizada
- Implementação
- do Projeto
- Ferramenta
- de Ticket TOTAL
- Ferramenta
- de Ticket
- Escritório
- Usuário
- Final
- Service Desk
- Service Desk
- Requisição
- de Serviço
- Chamada
- de voz
- Chamada
- de voz
- Equipe
- Avanade

## Slide 20: DashboardsAcompanhamento do nível de serviço através de dashboards
- O monitoramento e acompanhamento de serviços de administração e manutenção dos ambientes Azure será feito por meio de dashboards com acesso Web e/ou Móvel, contendo informações sobre o serviço da Avanade e consumo de componentes do Azure (processador, memória, disco e rede).
- Um exemplo de dashboards disponível exclusivamente para a operação da infraestrutura da TOTAL são representados a seguir:
- Os dashboards são ativos da Avanade e são disponibilizados ao cliente durante a prestação do serviço. Ao término do contrato os dashboards não são oferecidos nem repassados à TOTAL.
- 20

## Slide 21: Escopo do serviçoObjetivos do nível de serviço (SLO)
- Tabela dos objetivos de nível de serviço que serão buscados durante a operação:*SLA de disponibilidade de infraestrutura do Azure , para qualquer Máquina Virtual de Instância Única que utiliza armazenamento premium para todos os discos, a Microsoft garante que o Cliente terá Conectividade da Máquina Virtual de, pelo menos, 99,9%.
- 21

## Slide 22: Matriz de Responsabilidade - RACI
- (A) Aprovador	(R) Responsável	(I) Informado	       (C) Consultado

## Slide 23: Matriz de Responsabilidade - RACI
- (A) Aprovador	(R) Responsável	(I) Informado	       (C) Consultado

## Slide 24: Premissas

## Slide 25: Premissas
- Para o objeto de serviços dessa proposta técnica a ser iniciada pela Avanade, as seguintes premissas devem ser plenamente realizadas. A Avanade se reserva o direito de terminar a atual proposta sem quaisquer penalidades em caso de qualquer pressuposto descritos abaixo não seja executada pela TOTAL ou seus subcontratados

## Slide 26: Premissas

## Slide 27: Premissas

## Slide 28: Premissas

## Slide 29
- Condições comerciais

## Slide 30: Condições Comerciais
- •A TOTAL Combustíveis autoriza desde a assinatura deste contrato, a Avanade a utilizar as informações do projeto como caso público, para fins de campanhas de marketing, e comprovação de capacidade técnica, ressalvando que serão mantidas confidenciais todas as informações tratadas como tal no(s) referido(s) Projeto(s)
- •O faturamento da Avanade será dividido em 2 faturas, sendo uma para os serviços gerenciados em nuvem (CMS) e outra para o consumo de nuvem Azure.
- •A TOTAL Combustíveis deverá adquirir antecipadamente US$ 43.564,77  correspondente a 70% da previsão de consumo anual de Azure estimado nos slides 6 e 7 de Requisitos Técnicos e 8 e 9 de Infraestrutura referência para cada fase, para realização do projeto, com validade de 12 meses, a contar da data da ativação da subscrição. •A cada 12 meses a TOTAL Combustíveis irá orçar e adquirir o valor correspondente ao ano subsequente conforme definido em conjunto em Avanade e estimados nos slides 6 e 7 de Requisitos Técnicos e 8 e 9 de Infraestrutura referência para cada fase conforme planejamento em conjunto com a Avanade.
- •Caso o consumo de Azure não seja suficiente para cobrir o previsão de consumo de 12 meses, a TOTAL Combustíveis será adicionalmente faturada pela Avanade mensalmente pelo consumo apurado, até que novos pacotes de consumo de Azure sejam adquiridos junto a Avanade.
- •O Azure será faturado em Reais (R$), mediante conversão do consumo calculado em Dólares Americanos (USD$), pela apuração da taxa de câmbio PTAX do dia do faturamento.
- •Os honorários referentes a instalação e configuração do ambiente serão de R$ 61.678,00, com despesas e tributos incluídos, a ser faturado ao final dos trabalhos de configuração de ambiente.
- •Os honorários mensais e consecutivos da Avanade para a prestação dos serviços gerenciados de nuvem, serão apurados mediante a multiplicação da quantidade de servidores, pelo valor unitário da janela de serviço, conforme quadro adiante, com todos os tributos incluídos, por um período de 60 meses a contar do início dos serviços.

## Slide 31: Condições Comerciais
- O baseline considerado como referencia para faturamento de honorários estão descritos nos slides 6 e 7 de Requisitos Técnicos e 8 e 9 de Infraestrutura referência para cada fase, O fluxo planejado de pagamentos com contratação antecipada anual de 70% do consumo previsto de Azure bem como dos Serviços gerenciados e de implantação do ambiente segue descrito a seguir:
- •Valores do Azure em dólares americanos USD
- Os valores estabelecidos nesta proposta para Azure são validos, unicamente, com a contratação dos serviços gerenciados de nuvem de forma conjunta. No caso de rescisão do contrato de prestação de serviços gerenciados de nuvem, os valores aqui estabelecidos deixam de ser válidos.
- •Fica estabelecido que a primeira parcela será faturada em 30 dias a contar do início dos serviços, sendo que as restantes serão faturadas nos meses subsequentes. O prazo de pagamento será de 30 (trinta) dias da emissão da respectiva fatura.
- •Nossos honorários são definidos considerando-se a natureza dos trabalhos desenvolvidos, a equipe a ser alocada, as premissas descritas em nossas Propostas, o tempo previsto para a realização do projeto e as atividades e entregáveis expressamente relacionados  nesta Proposta. Qualquer alteração nestes pontos, que reflita em aumento nos custos incorridos pela Avanade para a prestação dos serviços objeto desta Proposta, deverá ser acordada por escrito e formalizada previamente entre as Partes em nova proposta comercial.

## Slide 32: Condições Comerciais
- O boleto bancário, bem como a respectiva Nota Fiscal de Serviços, será entregue mensalmente, com antecedência mínima de 30 (trinta) dias da data de vencimento de cada parcela.
- •Havendo atraso no recebimento do boleto bancário ou dos dados bancários ou da respectiva Nota Fiscal de Serviços, ou ainda, qualquer erro na emissão ou informação dos mesmos, os vencimentos serão automaticamente estendidos por igual número de dias de atraso, sem qualquer penalidade
- •Ocorrendo atraso no pagamento dos serviços objeto dessa proposta e observado o procedimento de pagamento estipulado neste documento, serão acrescidas multa de 2% (dois por cento) ao mês, incidente sobre o(s) valor(es) em atraso, acrescida de juros de 1% (um por cento) ao mês e atualização monetária pelo índice IGP-M, calculados pro rata die, desde a data de vencimento até a de efetivo pagamento.
- •Os valores constantes da presente proposta serão atualizados monetariamente a cada 12 (doze) meses, a contar da data de assinatura deste documento, ou na menor periodicidade determinada pela legislação vigente à época de cada vencimento, segundo variação do IPCA (Índice Nacional de Preços ao Consumidor) divulgado pelo IBGE (Instituto Brasileiro de Geografia e Estatística) para o respectivo período ou pelo índice oficial que venha a substituí-lo.
- •Os valores aqui estabelecidos já contemplam os tributos incidentes e aplicáveis tributos na cidade de São Paulo (atualmente ISS, PIS e COFINS). Na hipótese de ocorrer majoração nas alíquotas ou ainda serem criados novos tributos que sejam incidentes, os valores aqui estabelecidos serão ajustados de forma a refletirem as novas alíquotas/tributos.
- Fica desde já acordado que os serviços objeto desta proposta somente poderão ser rescindidos por qualquer das Partes sem justa causa após o prazo inicial de até 12 (doze) meses de vigência. Decorridos 12 (doze) meses da prestação dos serviços, qualquer das Partes poderá rescindir a prestação dos serviços aqui pactuada desde que mediante aviso prévio de 06 (seis) meses  por escrito à outra parte e pagamento de multa equivalente aos últimos 3 meses. Neste caso, as Partes acordam ainda que a TOTAL Combustíveis pagará à CONTRATADA pelos serviços prestados até a data da efetiva rescisão.

## Slide 33
- Termos e Condições para a prestação de serviços gerenciados

## Slide 34: Termos e condições para a prestação de serviços gerenciados
- Os seguintes termos contratuais fazem parte desta proposta comercial (“Carta”) e, na ausência de um contrato de prestação de serviços que melhor defina a relação entre as partes, regerão a prestação dos serviços entre a AVANADE DO BRASIL LTDA., sociedade com sede na Cidade de Barueri, Estado de São Paulo, à à Rua Bonnard, 980 bloco 10, nível 6,, Alphaville,  inscrita no CNPJ/MF sob nº. 04.049.976/0001-00, e filiais conforme a seguir: a) Rua Alexandre Dumas n. 2.051, Chácara Santo Antônio, CEP 04717-004, São Paulo- SP, inscrita no CNPJ/MF sob o n. 04.049.976/0002-90; b) Rua Cais do Apolo n. 222, 10º andar, parte, Edifício Vasco Rodrigues, bairro do Recife Antigo, CEP 50030-220, Recife – PE, inscrita no CNPJ/MF sob o no. 04.049.976/0004-52 e c) Avenida Marechal Floriano n. 99, 16º andar, parte, Edifício ICOMAP III, CEP 20080-004, Rio de Janeiro – RJ, inscrita no CNPJ/MF sob o no. 04.049.976/0003-71; todas representadas por seu representante legal ao final assinado, doravante designadas “AVANADE e TOTAL Distribuidora S/A com sede na R. Antônio Pedro de Figueiredo, 56 na cidade de Recife, Estado de Pernambuco, inscrita no CNPJ sob o numero 01.241.994/0003-62 neste ato devidamente representada na forma de seus atos constitutivos, adiante designada apenas como TOTAL Combustíveis (“Cliente”):
- •Em razão desta Carta, cada uma das partes poderá ter acesso à informação marcada como confidencial da outra parte, sendo que ambas as partes usarão dos mesmos cuidados que destinam a proteção de sua própria informação confidencial à informação confidencial da outra parte. Não obstante, não será considerada informação confidencial aquela que: (i) seja previamente sabida pela Parte Receptora; (ii) independentemente desenvolvida por si; (iii) obtida de terceiros que, até onde se saiba, não esteja obrigada a um correspondente dever de confidencialidade; ou (iv) que se torne pública sem que as obrigações de confidencialidade aqui assumidas tenham sido violadas ou (v) mediante ordem judicial.
- •Todas as informações prestadas pelo Cliente deverão ser corretas, completas e devidamente reveladas a Avanade.
- •Todos os prazos, valores, produtos finais e condições desta proposta estão condicionados à materialização das premissas usadas na sua confecção, premissas estas colhidas no Cliente junto a seus diretores e funcionários.
- •A Avanade reserva o direito de determinar a composição de sua equipe engajada na prestação de serviços ao Cliente.
- •As partes concordam desde já em revisar os termos do presente acordo na eventualidade de fato que implique na onerosidade excessiva desta Carta.
- •Os resultados finais dos serviços prestados sob esta Carta foram elaborados para uso exclusivo do Cliente, sendo que o Cliente não deverá reproduzi-los ou apresentá-los fora de sua organização.

## Slide 35: Termos e condições para a prestação de serviços gerenciados
- • O Cliente será totalmente responsável pela implementação ou não de quaisquer recomendações feitas pela Avanade, sendo o Cliente o responsável pela utilização dada aos resultados dos serviços prestados e suas consequências. Todas as estimativas e recomendações produzidas pela Avanade são feitas com base nas informações e fatos conhecidos atualmente.
- • Não fazem parte do escopo deste projeto quaisquer considerações legais, fiscais ou contábeis, devendo o Cliente validar as recomendações feitas pela Avanade com seus assessores em tais áreas.
- • Este trabalho não constitui identificação de riscos, desenho, documentação e teste de controles relacionados ao Ato Sarbanes-Oxley ou qualquer outro ato regulatório nacional ou internacional.
- • Nenhuma das Partes será responsável por circunstâncias extrínsecas ao seu controle que atrasem ou prejudiquem a prestação dos serviços pela Avanade ao Cliente.
- • As Partes não usarão o nome, logo ou marca da outra Parte fora de suas respectivas organizações sem autorização prévia para tanto. Não obstante, a Avanade está desde já autorizada a mencionar o nome do Cliente bem como os Serviços que tem prestado para fins de referência junto a terceiros.
- • O Cliente reconhece e aceita que toda propriedade intelectual, (incluindo, mas não se limitando a patentes, direitos autorais, metodologias, técnicas, "know-how" e programas de computador) desenvolvida pela Avanade anteriormente ou durante a vigência dos serviços, constitui propriedade intelectual exclusiva da Avanade.
- • Nenhuma disposição aqui contida poderá ser invocada pelo Cliente para impedir, prejudicar ou de qualquer forma restringir o direito da Avanade  de prestar para terceiros serviços que sejam iguais ou similares aos serviços prestados sob esta proposta e/ou desenvolver para terceiros obras e trabalhos que sejam iguais ou similares ao Produto Final.
- • Na eventualidade dos pagamentos não serem efetuados na data devida, serão acrescidos ao principal multa de 2% (dois por cento) e juros de 1% (um por cento) sem prejuízo da atualização pelo índice IGP-M calculado pro rata die a partir da data do pagamento, quando aplicável. Quaisquer tributos oriundos da presente Carta serão de responsabilidade do Cliente.
- • Os serviços prestados sob esta proposta serão objeto de aceitação pelo Cliente, sendo certo que o Cliente terá um prazo de até 3 (três) dias ao final de cada mês para manifestar por escrito todas as objeções que eventualmente tiver a esse respeito, sob pena de os serviços serem presumidos como integralmente aceitos sem reservas. O Cliente deverá levantar todas as objeções que eventualmente tiver em uma única oportunidade, dentro do prazo de aceitação estabelecido, sendo-lhe vedado após tal manifestação levantar novas objeções que não tenham sido manifestadas.

## Slide 36: Termos e condições para a prestação de serviços gerenciados
- •A Avanade garante que seus profissionais designados a prestar os serviços descritos nesta Carta terão capacitação técnica para fazê-lo e compromete-se, caso disponha, a substituir aqueles que não apresentem tal capacitação, desde que solicitado por escrito pelo Cliente, dentro do prazo de 15 (quinze) dias. Tal garantia é expressa e concedida no lugar de quaisquer outras, implícitas e explícitas.
- •A Avanade não se responsabilizará ainda por qualquer produto ou serviço que não tenha sido respectivamente fabricado ou prestado pela Avanade  para o Cliente. A Avanade tampouco se responsabilizará por atrasos devidos a circunstâncias sob responsabilidade direta dos provedores de quaisquer produtos ou serviços associados ao projeto. Na hipótese de tais atrasos gerarem custos adicionais ou extensões de prazo, as partes concordam em revisar os custos e honorários pertinentes ao projeto.
- •O limite de responsabilidade da Aanade perante o Cliente e/ou terceiros com relação à execução ou inexecução da presente Carta ou de qualquer maneira relacionado a esta Carta, sob nenhuma circunstância excederá, em agregado, 3 (três) vezes, durante todo o período do contrato, não cumulativamente, o valor da última fatura de honorários pagos pelo CLIENTE à AVANADE no mês imediatamente anterior a demanda. Não obstante, sob nenhuma circunstância será a Avanade responsável por danos indiretos, lucros cessantes e/ou danos morais, incluindo, mas não se limitando a perda de receita.
- •Nenhuma das Partes será responsabilizada por eventos de caso fortuito ou força maior que atrasem, prejudiquem ou impeçam o cumprimento das obrigações de prestação dos serviços pela Avanade ao Cliente, casos em que a Parte prejudicada deverá notificar à outra Parte, com a maior brevidade possível, após ter ciência da ocorrência de um evento de caso fortuito ou força maior. Após a citada notificação, caso as Partes não entrem em acordo, dentro de 30 (trinta) dias, sobre as medidas cabíveis para remediar tais fatos, a Parte prejudicada poderá optar pela rescisão contratual imediata, independentemente de qualquer indenização, ônus, ou penalidade para qualquer das Partes. Caso o Evento de Força Maior coloque ou ameace colocar em risco a segurança do pessoal da AVANADE, fica desde já acordado que a AVANADE poderá retirar o seu pessoal da área de risco até que a situação seja por elas considerada estável.
- •O Cliente é responsável pelo licenciamento de qualquer software relacionado à prestação dos serviços pela Avanade, assim como pela aquisição do hardware correspondente. Tanto software quanto hardware deverão estar disponíveis no dia do início das atividades da Avanade.
- •Fica desde já acordado que os serviços objeto desta proposta somente poderão ser rescindidos por qualquer das Partes sem justa causa após o prazo inicial de até 12 (doze) meses de vigência. Decorridos 12 (doze) meses da prestação dos serviços, qualquer das Partes poderá rescindir a prestação dos serviços aqui pactuada desde que mediante aviso prévio de 6 (seis) meses por escrito à outra parte e pagamento de multa compensatória de 3 (três) vezes o valor da última parcela de honorários faturada pela Avanade. Neste caso, as Partes acordam ainda que o Cliente pagará à Avande pelos serviços prestados e despesas incorridas até a data da efetiva rescisão.

## Slide 37: Termos e condições para a prestação de serviços gerenciados
- •As Partes estabelecem, de comum acordo, que não poderão, sem o consentimento por escrito da outra parte, apresentar qualquer proposta de emprego a qualquer profissional da outra parte que possua contrato de trabalho em vigor e que esteja relacionado ao projeto objeto da presente proposta quando assinada pelas partes, seja este profissional empregado de qualquer das Partes.
- •As Partes pactuam que não se aplica o teor do disposto no item acima, caso a oportunidade profissional existente em uma das Partes seja publicada na imprensa especializada, no website do Cliente ou no da Avanade, ou na internet e o profissional candidata-se à vaga em uma das partes por um dos referidos canais.
- •Dados Pessoais do Cliente: As partes têm conhecimento que a Avanade não processará os dados pessoais do Cliente como parte dos serviços objeto do presente instrumento. Na hipótese de a Avanade receber ou ter acesso aos Dados Pessoais do Cliente, que não tenham sido identificados na presente proposta, Avanade notificará o cliente e o Cliente deverá instruir a Avanade sobre a inutilização ou devolução de tais dados. Se o Cliente não proceder qualquer tipo de orientação, a Avanade terá o direito, sob seu exclusivo critério, de destruir os Dados Pessoais do Cliente ou devolvê-los ao Cliente.  O Cliente desde já concorda em envidar todos os esforços para evitar que a Avanade tenha acesso ou receba quaisquer Dados Pessoais.
- •Os programas de sanções econômicas ou controles de exportação aplicáveis poderão incluir leis de controle de exportação dos Estados Unidos, tais como, os Regulamentos de Administração de Exportações e os Regulamentos de Tráfico Internacional de Armas, e os programas de sanções econômicas dos Estados Unidos que são ou poderão ser mantidos pelo Governo dos Estados Unidos, inclusive as sanções atuais contra a Bielo Rússia, Burma (Myanmar), Cuba, República Democrática do Congo, Irã, Costa do Marfim, Libéria, Coréia do Norte, Sudão, Síria e Zimbábue, bem como os programas de Pessoas Bloqueadas e Nacionais Especialmente Designados. Avanade e o Cliente cumprirão as leis de sanções econômicas dos Estados Unidos e controle de exportação dos Estados Unidos com respeito à exportação ou re-exportação de bens, software, serviços e/ou dados técnicos originados dos Estados Unidos, ou o produto direto dos mesmos.
- •Avanade pertence parcialmente a Microsoft e Accenture, e tem uma estreita aliança com a Microsoft, que é também o fornecedor principal de Avanade. O Cliente reconhece que Avanade trabalha estreitamente com a Microsoft em assuntos técnicos e de marketing, para promover soluções utilizando a plataforma Microsoft, e poderá receber compensação ou outros benefícios com relação ao desenvolvimento, promoção ou vendas de produtos e serviços.
- •As Partes declaram e garantem cumprem e cumprirão com todas as leis, normas, decretos, regulamentos e posturas aplicáveis às práticas de anti-suborno e anti-corrupção, incluindo, mas não se limitando à U.S. Foreign Corrupt Practices Act (“FCPA”) - Ato de Práticas de Corrupção Estrangeira aos Estados Unidos, U.K. Bribery Act – Ato de Práticas de Corrupção do Reino Unido, a lei brasileira contra a corrupção e o suborno (Lei nº 12.846/13), bem como quaisquer outras leis neste sentido. Sob hipótese alguma as Partes estarão obrigadas por este Contrato a tomar atitudes que de boa-fé acreditem que as levariam a infringir quaisquer leis, regras, regulamentos ou posturas aplicáveis.

## Slide 38: Termos e condições para a prestação de serviços gerenciados
- •O Cliente e a Avanade obrigam-se a:
- (i) cumprir todas as normas e exigências legais relativas à política nacional do meio ambiente emanadas das esferas Federal, Estadual e Municipal, principalmente no que concerne à utilização racional de recursos naturais, evitando-se desperdícios, bem como a disposição correta de seu lixo comercial ou industrial;
- (ii) cumprir os preceitos e determinações legais concernentes às normas de Segurança e Medicina no Trabalho, bem como as convenções e acordo trabalhistas e sindicais referentes às categorias de trabalhadores empregados pelas Partes;
- (iii) não contratar ou permitir que seus subcontratados contratem mão-de-obra que envolva a exploração de trabalhos forçados ou trabalho infantil;
- (iv) não empregar trabalhadores menores de dezesseis anos de idade, salvo na condição de aprendiz a partir dos quatorze anos de idade, nos termos da Lei nº 10.097, de 19.12.2000 e da Consolidação das Leis do Trabalho.
- (v) não empregar adolescentes até 18 anos em locais prejudiciais à sua formação, ao seu desenvolvimento físico, psíquico, moral e social, bem como em locais e serviços perigosos ou insalubres, em horários que não permitam a frequência à escola e, ainda, em horário noturno, considerado este o período compreendido entre as 22h e 5h;
- (vi) não adotar práticas de discriminação negativa e limitativas ao acesso, ao emprego ou à sua manutenção;
- (vii) manter todas as instalações onde serão prestados os Serviços em conformidade com as exigências e padrões mínimos estabelecidos pela legislação brasileira;
- As Partes comprometem-se a observar os princípios de responsabilidade social aqui indicados em sua rotina comercial, sendo que o descumprimento destas obrigações poderá dar ensejo à rescisão deste instrumento, mediante notificação com 30 dias de antecedência.
- O presente anexo é regido pelas leis brasileiras e é eleito o foro da Cidade de São Paulo, com renúncia expressa de qualquer outro, por mais privilegiado que seja, para nele dirimirem as questões porventura oriundas desta carta.

## Slide 39
- Termos e Condições de Hospedagem

## Slide 40: Termos e condições de hospedagem
- Os seguintes termos adicionais aplicam-se aos serviços de hospedagem e armazenamento em nuvem fornecidos por intermédio da plataforma Microsoft Azure (“Serviços em Nuvem”). Todos os Serviços em Nuvem serão prestados ao Cliente em conexão com os Serviços aplicáveis detalhados na presente Proposta (“Proposta”). A data de início de vigência deste Anexo (“Data de Início de Vigência”) é a última data de assinatura abaixo.
- Os termos em maiúsculas usados, mas não definidos neste Anexo, terão os mesmos significados que lhes foram atribuídos na Proposta Em caso de conflito entre este Anexo e a referida proposta que não esteja expressamente resolvido nesses documentos, prevalecerão os termos deste Anexo no que tange os Serviços em Nuvem.
- 1.Serviços em Nuvem.
- a.Geral. A Avanade concorda em prestar ao Cliente os Serviços em Nuvem previstos neste Anexo.  Todas as referências a Serviços no Contrato incluirão também os Serviços em Nuvem detalhados neste Anexo, salvo indicação em contrário neste Anexo. Referências feitas neste Anexo em relação a um website em particular significarão a versão mais atual do referido website ou um website posterior, estando todos eles sujeitos a mudanças sem aviso prévio.
- b.Acordo com a Coligada. O Cliente reconhece e concorda que a Avanade, por meio de sua Coligada, pode tomar providências para que uma coligada Licenciadora de Microsoft GP aplicável (“Microsoft”) disponibilize os Serviços em Nuvem para o Cliente, em nome da Avanade. Para que não restem dúvidas, a prestação dos Serviços em Nuvem não é uma subcontratação das obrigações da Avanade para as Coligadas e/ou Microsoft, mas um acordo baseado em coligadas para o uso das ofertas de serviços a seus respectivos clientes.
- c.Mudanças nos Recursos e Funcionalidades do Azure. O Cliente reconhece e concorda que a Microsoft poderá modificar ou remover recursos ou funcionalidades existentes (inclusive a disponibilidade em um determinado país) nos Serviços em Nuvem, podendo afetar a capacidade da Avanade de executar os Serviços. Na eventualidade de a Microsoft notificar a Avanade de alguma modificação ou remoção de recursos ou funcionalidades importantes ou da descontinuidade dos Serviços em Nuvem (nos termos da Seção 2.b) de tal forma que prejudique significativamente a capacidade da Avanade de executar os Serviços, a Avanade envidará esforços razoáveis para manter o Cliente informado das mudanças planejadas para os Serviços em Nuvem.
- 2. Vigência e Rescisão.
- a.Vigência.  A prestação dos Serviços em Nuvem começará na Data de Início de Vigência e continuará pelo período previsto nesta Proposta, a menos que rescindida nos termos deste Anexo.

## Slide 41: Termos e condições de hospedagem
- b.Rescisão. As partes reconhecem que há certas circunstâncias em que a Microsoft pode rescindir assinaturas dos Serviços em Nuvem, como descritos abaixo. Nesses casos, será afetada a capacidade da Avanade de prestar os Serviços em Nuvem. Como resultado, a Avanade poderá optar por rescindir a prestação dos Serviços em Nuvem e/ou respectivas Propostas, mediante notificação por escrito ao Cliente, na eventualidade de a Microsoft exercer qualquer uma das opções de rescisão seguintes, de acordo com os prazos correspondentes previstos abaixo:
- (1) A Microsoft pode rescindir qualquer assinatura dos Serviços em Nuvem sem justa causa mediante notificação por escrito com antecedência de 60 (sessenta) dias.
- (2) A Microsoft pode rescindir qualquer conta de Cliente dos Serviços em Nuvem se o Cliente fizer com que a Avanade descumpra com suas obrigações para com suas Coligadas ou com a Microsoft nos termos dos contratos com elas firmados. Salvo se o descumprimento, por sua própria natureza, não puder ser sanado em trinta (30) dias, a Avanade apresentará ao Cliente um aviso prévio de trinta (30) dias da intenção de rescisão da Microsoft e uma oportunidade de sanar o problema.
- (3) A Microsoft pode modificar ou rescindir qualquer conta de Cliente dos Serviços em Nuvem em qualquer país ou jurisdição onde exista exigência ou obrigação governamental atual ou futura que (i) sujeite a Microsoft a regulamento ou exigência não aplicável geralmente a empresas que lá operam, (ii) represente uma dificuldade para a Microsoft continuar realizando os Serviços em Nuvem sem modificação, e/ou (iii) leve a Microsoft a acreditar que os termos de seu contrato com a Coligada da Avanade possam entrar em conflito com tal exigência ou obrigação. A Avanade notificará o Cliente assim que possível após realizar as devidas auditorias e investigações na eventualidade de a Microsoft notificar a Coligada da Avanade de sua intenção de modificar ou rescindir os Serviços em Nuvem, de acordo com esses termos.
- c.Suspensão. Além das circunstâncias relativas à suspensão dos Serviços previstas no Contrato ou no SOW, a Avanade poderá suspender o uso de qualquer parte dos Serviços em Nuvem pelo Cliente quando: (1) o uso dos Serviços em Nuvem pelo Cliente ou Usuários, ou em seu nome, em descumprimento deste Anexo, representar uma ameaça direta ou indireta ao funcionamento ou integridade dos Serviços em Nuvem ou ao uso dos Serviços em Nuvem por qualquer outra pessoa; (2) o Cliente ou Usuários tiverem violado os termos deste Anexo de tal forma que possa prejudicar significativamente os Serviços em Nuvem ou a Avanade, suas Coligadas, ou a Microsoft; ou (3) o Cliente não tiver contestado de forma adequada ações de terceiros em relação ao uso dos Serviços em Nuvem e a Avanade tiver motivos razoáveis para acreditar que a não suspensão dos Serviços em Nuvem resultaria em: (i) responsabilidade civil da Avanade, suas Coligadas, ou da Microsoft ou (ii) obrigação da Avanade, suas Coligadas, ou da Microsoft de contestar tais ações.  A Avanade, quando não proibida por lei e conforme razoável dentro das circunstâncias, fornecerá ao Cliente notificação prévia de qualquer suspensão dos Serviços como acima descrita e dará uma oportunidade de tomar providências para evitar tal suspensão dos Serviços em Nuvem. Toda e qualquer suspensão deverá ser aplicada à porção mínima necessária dos Serviços em Nuvem e só permanecerá em vigor pelo tempo razoavelmente necessário para resolver as questões que lhe deram causa.

## Slide 42: Termos e condições de hospedagem
- Permanência em Vigor. A rescisão antecipada ou vencimento da prestação dos Serviços em Nuvem nos termos deste Anexo não será interpretada(o) como renúncia ou liberação de qualquer reivindicação que uma parte tenha direito de apresentar no momento de tal rescisão ou vencimento (inclusive reivindicações  por  honorários acumulados ou a pagar para a Avanade antes da data efetiva de rescisão ou vencimento), sendo que as cláusulas aplicáveis do Anexo continuarão valendo para tal reivindicação até sua resolução. Todo e qualquer termo que, por sua natureza, deva sobreviver à rescisão ou vencimento deste Anexo, sobreviverá.
- 3.Limite da Garantia dos Serviços em Nuvem.
- A AVANADE NÃO DÁ GARANTIAS OU CONDIÇÕES EXPRESSAS OU IMPLÍCITAS (INCLUSIVE GARANTIAS INCLUÍDAS NO CONTRATO) COM RELAÇÃO AOS SERVIÇOS EM NUVEM, E A AVANADE ISENTA-SE EXPRESSAMENTE DE TODA E QUALQUER DECLARAÇÃO, GARANTIA OU CONDIÇÃO IMPLÍCITA, INCLUINDO, ENTRE OUTRAS, QUAISQUER GARANTIAS DE COMERCIABILIDADE, ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO, QUALIDADE SATISFATÓRIA, TÍTULO OU NÃO VIOLAÇÃO. A AVANADE  NÃO GARANTE QUE OS SERVIÇOS EM NUVEM SERÃO ININTERRUPTOS OU ISENTOS DE ERROS. O CLIENTE RECONHECE E CONCORDA QUE A AVANADE NÃO EXERCE CONTROLE E NÃO ACEITA RESPONSABILIDADE PELA CONFORMIDADE DO CLIENTE COM AS LEIS OU REGULAMENTOS APLICÁVEIS AO SETOR DO CLIENTE OU DE SEUS PRÓPRIOS CLIENTES EM RELAÇÃO AO USO QUE FIZER DOS SERVIÇOS EM NUVEM. ESTES TERMOS DE ISENÇÃO DE RESPONSABILIDADE APLICAR-SE-ÃO, A MENOS QUE A LEGISLAÇÃO APLICÁVEL NÃO O PERMITA
- 4.Direitos e Dados
- a.Acesso aos Serviços em Nuvem. A Avanade garante ao Cliente o direito de acesso e uso dos Serviços em Nuvem, sujeito aos termos deste Anexo.  A Avanade, suas Coligadas e a Microsoft não fornecem licenças de software nem direitos de propriedade intelectual no que tange este Anexo, sendo que tais direitos teriam de ser previstos em contrato de licenciamento separado.  Todos os direitos que não sejam expressamente concedidos neste Anexo ficam reservados à Avanade e/ou Microsoft.
- b. Serviços. O Cliente reconhece e concorda que, como entre as partes, a Avanade, suas Coligadas, a Microsoft e suas licenciadoras retêm todos os direitos, títulos e interesses relativos aos Serviços em Nuvem e todos os direitos de propriedade a eles associados, e que o Cliente não adquire direitos, expressos ou implícitos, quanto aos Serviços em Nuvem nem a qualquer outra propriedade intelectual da Avanade, suas Coligadas, ou Microsoft nos termos deste Anexo, a não ser o direito de usar os Serviços em Nuvem conforme expressamente concedido neste Anexo. O Cliente concorda que não fará, direta ou indiretamente, engenharia reversa, decompilação, desmontagem nem tentará derivar o código-fonte ou outros segredos comerciais da Avanade, sua Coligada, Microsoft ou fornecedores terceirizados.

## Slide 43: Termos e condições de hospedagem
- c. Dados Pessoais do Cliente. O Cliente concede à Avanade e Microsoft um direito global  não-exclusivo e intransferível de hospedar (o que  inclui hospedar, processar e armazenar) Dados Pessoais do Cliente na plataforma Microsoft a fim de fornecer os Serviços em Nuvem, inclusive o direito de usar e reproduzir tais Dados Pessoais do Cliente dentro dos sistemas da Microsoft exclusivamente para tais propósitos de hospedagem. Os Dados Pessoais do Cliente serão tratados de acordo com as cláusulas de privacidade e segurança de dados estipuladas no Contrato, no SOW, e de acordo com as políticas e procedimentos publicados pela Microsoft em relação ao tratamento de tais dados.
- d.Produtos de Terceiros. Se o Cliente instalar ou usar Produtos de Terceiros em conjunto com os Serviços em Nuvem, só poderá fazê-lo de uma maneira que não sujeite a propriedade intelectual da Microsoft, Avanade ou de suas Coligadas a obrigações além daquelas expressamente incluídas neste Anexo. O Cliente é exclusivamente responsável por Produtos de Terceiros que instale ou use com os Serviços em Nuvem. O Cliente obterá os direitos necessários para garantir que quaisquer Dados do Cliente ou outras informações que venham a ser hospedadas pela Avanade na prestação dos Serviços em Nuvem não sujeitarão a Avanade, a Microsoft nem suas respectivas propriedades intelectuais a outras obrigações do Cliente ou de terceiros.
- 5. Disposições Gerais
- a. Cumprimento das Leis e Regulamentos por parte do Cliente.  O Cliente deverá cumprir com todas as leis e regulamentos aplicáveis ao uso que fizer dos Serviços em Nuvem, incluindo leis relacionadas a privacidade, proteção de dados e confidencialidade das comunicações. O Cliente é responsável por implementar e manter proteções de privacidade e medidas de segurança dos componentes que o Cliente fornecer ou controlar (tais como dispositivos registrados no Windows Intune ou dentro de uma máquina virtual ou aplicativo do cliente Microsoft Azure), e por determinar se os Serviços em Nuvem são apropriados para o armazenamento e processamento de informações sujeitas a lei ou regulamento específico. O Cliente deverá responder a pedidos feitos por terceiros em relação ao uso que fizer dos Serviços em Nuvem, como, por exemplo, um pedido de remoção de conteúdo segundo a lei americana sobre direitos autorais digitais (U.S. Digital Millennium Copyright Act) ou outras leis aplicáveis.
- b. Direitos Adquiridos.  A Avanade e o Cliente concordam que o fornecimento e uso dos Serviços em Nuvem não devem resultar em responsabilidade nos termos da diretriz europeia sobre direitos adquiridos, Acquired Rights Directive (Diretriz do Conselho 2001/23/EC, anteriormente Diretriz do Conselho 77/187/EC, conforme modificada pela Diretriz do Conselho 98/50/EC) ou quaisquer leis ou regulamentos nacionais que implementem as mesmas leis e regulamentos ou similares (inclusive os Regulamentos de 2006 sobre Transferência de Atividades (Proteção do Emprego) no Reino Unido (coletivamente denominados  “ARD). O Cliente defenderá a Avanade contra qualquer ação decorrente das ARD que alegue a transferência (ou suposta transferência) de empregado ou contratada para a Avanade em função da prestação dos Serviços em Nuvem. A Avanade defenderá o Cliente contra qualquer ação decorrente das ARD que alegue a transferência (ou suposta transferência) de empregado ou contratada para o Cliente em função da rescisão ou vencimento dos Serviços em Nuvem. Em cada caso, a parte que estiver fazendo a defesa deverá pagar o valor da eventual condenação (ou do  acordo que venha a fazer), e a outra parte deverá notificar a primeira sobre a ação, conceder-lhe amplo controle sobre a contestação e acordo da ação e fornecer assistência razoável na contestação da ação (devendo os custos de assistência  razoáveis ser reembolsados pela parte que estiver fazendo a defesa).

## Slide 44: Termos e condições de hospedagem
- c. Jurisdição de Exportação dos E.U.A. Os Serviços em Nuvem estão sujeitos à legislação de controle de exportações dos E.U.A. Cada uma das partes deverá observar todas as leis aplicáveis, incluindo os Regulamentos de Administração de Exportações dos E.U.A. (U.S. Export Administration Regulations), os Regulamentos de Tráfego Internacional de Armas (International Traffic in Arms Regulations) bem como as restrições de usuário final, uso final e destino emitidas pelo governo americano e outros. Para mais informações, acesse http://www.microsoft.com/exporting/.
- d. Notificações Eletrônicas.  A Avanade poderá fornecer ao Cliente informações e notificações sobre os Serviços em Nuvem por meio eletrônico, incluindo mensagens de e-mail, o portal dos  Serviços em Nuvem ou um website a ser identificado pela Avanade para o propósito desta Seção 5.d. Uma notificação é considerada como dada na data em que for disponibilizada pela Avanade.
- Lei Aplicável: este Contrato será interpretado e aplicado de acordo com as leis do Brasil, foro de São Paulo, sem eficácia de seus dispositivos sobre diferentes legislações.

## Slide 45: Termo de aceite da Proposta
- Na ausência de um contrato que melhor defina o relacionamento entre as partes, estas se pautarão pelos termos e condições da presente proposta, inclusive aqueles aplicáveis aos serviços gerenciados e de hospedagem.
- Finalmente, agradecemos mais uma vez a oportunidade que nos foi concedida e permanecemos à disposição para quaisquer esclarecimentos que se façam necessários.
- Solicitamos ainda, caso V.Sa. concorde com os termos da presente, sua anuência no espaço adiante.
- São Paulo ___de _______de 2017
- De acordo
- ________________________________________
- Avanade do Brasil Ltda.
- _______________________________				_______________________________
- Cliente:						Cliente:
- Nome:						Nome:
- Cargo:						Cargo:
- Testemunha 1					Testemunha 2

## Slide 46
- Sobre a Avanade

## Slide 47: Por que Avanade?A Avanade é especialista em tecnologia de Nuvem Microsoft
- 47
- Visão Abrangente do uso da Nuvem
- Capacidade de execução fim-a-fim
- Ativos de software usados globalmente

## Slide 48: Por que Avanade?Cloud Infrastructure
- 48
- Por quê?
- Responder rapidamente a novas oportunidades de negócios e otimizar seu ambiente operacional escalando recursos rapidamente tirando o proveito sobre o valor de um uma arquitetura de nuvem elástica
- O que ?
- Estratégia de Infraestrutura
- Modernização de Infraestrutura
- Transformação de Windows Server 2003
- Serviços gerenciados de nuvem
- Diretor de computação corporativa, Unilever
- Como?
- Inigualável experiência com nuvem pública, privada e híbrida da Microsoft
- Empoderar usuários de negócio através de auto atendimento orientado ao negócio com provisionamento e gerenciamento
- Abordagens  atestadas para migrar cargas de trabalho legadas para ambientes de núvem publica
- Gerenciamento centralizado para garantir controle,  governança e redução de riscos
- “ Em parceria com a Avanade, a Unilever é capaz de alavancar a escala e o alcance para desenvolver diversos planos estratégicos para formas alternativas de trabalho. Isso nos dá flexibilidade e agilidade adicionado à medida que trabalhamos para cumprir nosso plano de melhoria contínua. “

## Slide 49
- Credenciais Azure

## Slide 50: Por quê Azure
- 24 Regiões, 19 online
  - 100+ datacenters
  - Top 3 redes no mundo
  - 2x AWS, 6x Google Regiões DC
  - G Series – Maior VM do mundo, 32 cores, 448GB Ram, SSD…
- Operational
- Announced/Not Operational
- Central US
- Iowa
- West US
- California
- North Europe
- Ireland
- East US
- Virginia
- East US 2
- Virginia
- US Gov
- Virginia
- North Central US
- Illinois
- US Gov
- Iowa
- South Central US
- Texas
- Brazil South
- Sao Paulo
- West Europe
- Netherlands
- China North *
- Beijing
- China South *
- Shanghai
- Japan East
- Saitama
- Japan West
- Osaka
- East Asia
- Hong Kong
- SE Asia
- Singapore
- Australia South East
- Victoria
- Australia East
- New South Wales
  - * Operated by 21Vianet

## Slide 51: Por quê Azure?
- A Microsoft também é a única fornecedora líder nos Magic Quadrants da Gartner em Infraestrutura de nuvem como serviço
- 51
- Realizar mais
- As ferramentas integradas, os modelos pré-compilados e os serviços gerenciados facilitam a compilação e o gerenciamento de aplicativos empresariais, móveis, da Web.
- Plataforma de serviço de nuvem aberta e flexível
- O Azure dá suporte à mais ampla seleção de sistemas operacionais, linguagens de programação, bancos de dados e dispositivos. Executa contêineres Linux com integração com Docker; compila aplicativos com JavaScript, Python, .NET, PHP, Java e Node.js; compile back-ends para dispositivos iOS, Android e Windows.
- Proteção de dados
- Primeiro provedor de nuvem reconhecido pelas autoridades da União Europeia. Primeiro prove adotar as normas internacionais de nuvem ISO 27018. E possui o Azure Government projetado para atender as exigências do Governo Americano.
- Estender o datacenter existente
- O Azure se integra facilmente com o ambiente de TI existente através da maior rede de conexões seguras e privadas.
- Dimensionar conforme necessário em um modelo sob-demanda
- Os serviços pré-configurados do Azure podem ser rapidamente escalados ou reduzidos verticalmente para acompanhar a demanda, para que se pague somente pelo que uso.
- Serviço de nuvem confiável
- O Azure é projetado para lidar com qualquer carga de trabalho. Mais de 66% das empresas da Fortune 500 confiam no Azure, que oferece SLAs de nível empresarial para os serviços, suporte técnico 24/7 e monitoramento de integridade do serviço 24 horas.

## Slide 52: Certificações Azure Datacenter
- 52
- SAP
- Cloud Partner

## Slide 53: SAP on Azure - Certificações
- 53

## Slide 54: SAP on Azure - Certificações
- 54

## Slide 55: SAP on Azure - Certificações
- 55
