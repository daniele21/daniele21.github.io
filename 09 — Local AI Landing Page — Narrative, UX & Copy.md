# 09 -Local AI Landing Page -Narrative, UX & Copy

## How the Local AI strategy becomes a scroll-driven personal landing page

Versione di lavoro -21 agosto 2026

# 1\. Obiettivo della landing

La landing deve tradurre il posizionamento strategico in un'esperienza semplice, memorabile e progressiva. Non deve sembrare un portfolio di progetti né una landing da consulente.

Il visitatore deve capire, in pochi secondi:

• chi è Daniele;

• qual è la sfida che sta esplorando;

• perché Local AI merita di essere rivalutato;

• come viene verificata la tesi attraverso infrastruttura, applicazioni e misurazione;

• che il risultato può essere Local, Hybrid o Cloud.

Il messaggio centrale è:

**Run AI where it makes sense.**

**Local AI first ≠ Local AI only.**

La posizione è:

**Find the boundary with evidence, not ideology.**

# 2\. Principio narrativo

La landing deve raccontare una sola storia. La hero pone la sfida. La linea blu che attraversa la pagina visualizza il metodo con cui la sfida viene affrontata. Ogni piano risponde a una domanda e genera naturalmente la domanda successiva.

Question chain:

Where should AI actually run?

**DECIDE → BUILD**

Can we actually run it locally?

**BUILD → TEST**

What happens in a real product?

**TEST → MEASURE**

Does it actually work well?

→ Evidence changes the next decision.

I quattro piani non sono quattro categorie del portfolio. Sono quattro layer consecutivi necessari per rispondere alla stessa domanda.

# 3\. Principio UX

La linea blu è la spina dorsale narrativa della pagina. Deve accompagnare fisicamente il visitatore da un piano al successivo, alternando sinistra e destra.

Principi:

• ogni piano deve dominare la viewport quando viene visto;

• il piano successivo non deve competere visivamente finché non si scrolla;

• la linea deve apparire come un percorso continuo, non come segmenti separati;

• i badge 1–4 devono essere ancorati alla stessa geometria;

• le transizioni devono far percepire che una domanda genera naturalmente la successiva;

• niente scroll-jacking: lo scroll resta naturale, ma la composizione è full-screen su desktop;

• su mobile la priorità è leggibilità e continuità narrativa, non il vincolo rigido di una viewport per piano.

# 4\. Hero -chi sono, la sfida e la posizione

Obiettivo: far capire in pochi secondi chi è Daniele, quale problema sta esplorando e quale principio guida il lavoro.

Layout consigliato: circa 1/3 persona, 2/3 missione.

La parte personale deve dare volto e contesto, ma la scena principale resta a “Local AI first ≠ Local AI only”.

## 4.1 Colonna identità -1/3

Foto professionale ma naturale, non corporate. Dimensione contenuta: serve a dare un volto alla tesi, non a diventare il focus principale.

Copy:

Hi, I'm Daniele.

AI engineer · builder.

“I build AI systems to understand where local execution creates real value.”

Il posizionamento da strategic AI advisor può comparire in modo secondario nella bio o nella parte finale, ma non deve competere con la missione nella hero.

## 4.2 Colonna missione -2/3

Eyebrow:

WHAT I'M EXPLORING

Lead:

Run AI where it makes sense.

H1:

**Local AI first ≠ Local AI only**

Challenge:

“How far can AI move from the cloud to systems we control?”

Spiegazione breve:

“Some workloads benefit from staying local: sensitive data stays closer, dependencies shrink, and you gain more control over how the system runs. Others still belong in the cloud.”

Posizione:

**“Find the boundary with evidence, not ideology.”**

Proof line:

“I do that by deciding where AI should run, building the infrastructure that makes local execution possible, testing it inside real products, and measuring how well it actually performs.”

CTA primaria:

Explore the work ↓

CTA secondaria:

Read my thinking →

La hero non deve vendere advisory. Deve generare curiosità e credibilità e introdurre la domanda che il resto della landing risolve.

# 5\. Ingresso nella roadmap

Microcopy consigliata sopra il primo piano:

HOW I'M TESTING THAT IDEA ↓

Da qui parte la linea blu e il badge 01\.

La percezione deve essere:

Hero \= la domanda.

Roadmap \= il modo in cui cerco la risposta.

# 6\. Piano 1 -Strategy / DECIDE

Domanda del piano:

Where should AI actually run?

Obiettivo narrativo:

spiegare perché Local AI va rivalutato e soprattutto quando. Il punto non è dimostrare che il local sia sempre migliore; è rimettere in discussione il cloud-by-default quando il workload rende importanti controllo, privacy, indipendenza o requisiti operativi specifici.

Kicker:

01 -STRATEGY

Titolo:

**Where should AI actually run?**

Copy consigliato:

“Before choosing models or runtimes, start with the workload. What do we gain by keeping data and execution under our control, and what do we give up?”

I quattro driver principali:

Privacy

Does sensitive data need to leave the environment?

Control

Do we need ownership of models, runtimes, configuration and execution path?

Dependency

How exposed are we to vendors, API changes, pricing and external availability?

Operational fit

What do latency, connectivity, reliability and scale actually require?

Visual:

Decision Framework \+ Local vs Hybrid vs Cloud \+ Trade-off Guide.

La visual deve aiutare a prendere una decisione, non semplicemente elencare vantaggi del local.

Messaggio chiave sotto la visual:

“Local is one option. Hybrid and Cloud remain part of the decision.”

Razionale:

questo è il layer strategico. Definisce il perché e i criteri. Solo se il local ha valore per quel workload ha senso passare all'ingegneria.

## 6.1 Transizione -DECIDE → BUILD

Pill:

**DECIDE → BUILD**

Sublabel:

“If Local AI makes sense for the workload, the next question is whether we can actually make it work.”

Animazione:

la linea lascia il lato del piano 1, attraversa orizzontalmente la pagina con una curva morbida e arriva al lato opposto. La pill compare mentre il path viene disegnato.

# 7\. Piano 2 -Architecture & Infrastructure / BUILD

Domanda del piano:

Can we actually run it locally?

Obiettivo narrativo:

mostrare il layer che abilita Local AI. La missione non può fermarsi alla scelta del modello: se vogliamo spostare AI verso device e infrastrutture controllate, dobbiamo capire come quei sistemi gestiscono modelli, runtime, memoria, lifecycle, routing, risorse, concurrency, failure e integrazione con le applicazioni.

Kicker:

02 -ARCHITECTURE & INFRASTRUCTURE

Titolo:

**Can we actually run it locally?**

Copy consigliato:

“This is where the strategy becomes engineering. I build the infrastructure needed to make local execution reusable, observable and manageable across very different environments.”

Tre territori principali:

Local infrastructure

Models, inference servers, lifecycle and stable API boundaries on desktop/workstation/private server.

On-device

Real LLM inference under memory, thermal, battery and mobile lifecycle constraints.

Local speech

Private ASR as another reusable primitive for local workflows.

Progetti che sostengono il piano:

• Local LLM Server -execution layer riusabile, OpenAI-compatible, con model lifecycle, routing, concurrency e telemetry;

• Android Local LLM Harness -laboratorio e target gateway per AI on-device, con model/runtime ownership, resource coordination, diagnostics e consumer boundary;

• Local ASR Server -primitive locale per speech e transcription.

Visual principale:

ecosystem.png

La grafica deve far percepire un sistema unico tra desktop, private/local server, Android, speech e cloud opzionale.

Proof line:

“Different environments. Same question: what can realistically stay local?”

Messaggio da far passare:

“Far partire un modello” non basta. Il layer di infra/arch deve rendere il device capace di gestire Local AI in modo esplicito e riusabile.

## 7.1 Transizione -BUILD → TEST

Pill:

**BUILD → TEST**

Sublabel:

“Infrastructure proves what can run. A real product reveals whether the architecture is actually useful.”

Animazione:

la linea ritorna verso il lato opposto della pagina. Copy e visual entrano da lati coerenti con la direzione del percorso.

# 8\. Piano 3 -Applications / TEST

Domanda del piano:

What happens in a real product?

Obiettivo narrativo:

evitare che infrastruttura e architettura restino singoli bei progetti tecnici. Il punto è provarli dentro use case specifici, con dati, workflow, failure mode e vincoli di prodotto reali.

Kicker:

03 -APPLICATIONS

Titolo:

**What happens in a real product?**

Copy consigliato:

“A runtime or benchmark cannot expose every product constraint. Real workflows can. I use applications as proving grounds for the infrastructure and architecture I build.”

Frase chiave:

“Each application is a test bed.”

Le card devono mostrare QUESTION → PROJECT → WHAT IT TESTS, non solo nome e descrizione.

## 8.1 RedactGuard

Question:

Can sensitive document processing stay local?

What it tests:

local LLM inference su documenti sensibili, definizioni PII configurabili, human review e controlled export.

Valore narrativo:

dimostra un workload privacy-sensitive dove mantenere documento e inferenza in un perimetro controllato può ridurre l'esposizione dei dati.

## 8.2 Aura Finance

Question:

Can personal financial transactions be understood and categorized without leaving the device?

What Local AI does:

• riconosce merchant e significato della transazione;

• normalizza e propone categorie/metadati strutturati;

• può lavorare su un import batch di una lista di transazioni oppure su una singola nuova transazione;

• lascia spazio a human review quando la proposta deve essere confermata o corretta.

What stays deterministic:

ledger, saldi, safe-to-spend, trend, aggregazioni e calcoli finanziari.

What it tests:

se un piccolo modello locale può svolgere un task semantico ricorrente e privacy-sensitive dentro un vero prodotto mobile senza inviare transazioni finanziarie personali a un modello esterno.

## 8.3 ClosedRoom

Question:

Can meeting intelligence stay inside the room?

What it tests:

local recording, ASR, speaker context, analysis e project memory, con provider esterni opt-in anziché default.

Valore narrativo:

dimostra che un workflow complesso può essere composto da più primitive locali con boundary espliciti.

## 8.4 Chiusura del piano Applications

Messaggio:

“The value of this layer is turning architecture capability into product evidence.”

Ma se il prodotto funziona, non abbiamo ancora dimostrato che la soluzione sia abbastanza buona.

## 8.5 Transizione -TEST → MEASURE

Pill:

**TEST → MEASURE**

Sublabel:

“A product running locally is not proof that Local AI works well. If it works, measure it.”

Animazione:

il path torna verso il lato del quarto piano; la transizione deve essere visivamente più “evidence-driven”, preparando l'ingresso dei dashboard/metriche.

# 9\. Piano 4 -Observability & Measurement / MEASURE

Domanda del piano:

Does it actually work well?

Obiettivo narrativo:

trasformare “funziona” in evidenza. Un workload può completarsi correttamente e restare comunque troppo lento, troppo pesante, poco affidabile, instabile sul device o difficile da osservare.

Kicker:

04 -OBSERVABILITY & MEASUREMENT

Titolo:

**Does it actually work well?**

Apertura:

“‘It runs’ is a very low bar.”

Domande principali:

Is it fast enough?

Latency, time to first token, throughput.

Does it fit?

RAM/VRAM, CPU/GPU, storage and model footprint.

Can the device sustain it?

Thermals, battery and long-running behavior where relevant.

Is it reliable?

Errors, retries, request completion and runtime health.

Is the claim observable?

Network behavior, evidence coverage, attribution quality and uncertainty.

## 9.1 Performance Lab

Ruolo nella landing:

non è semplicemente un benchmark dashboard. È il layer che risponde a una domanda molto concreta:

**“Per il tuo use case e il tuo device, quale modello e configurazione massimizzano le performance?”**

Versione inglese consigliata:

“For this use case and this device, which model and configuration maximize performance while meeting the required quality, latency and resource constraints?”

Principio chiave:

**“There is no best model in absolute terms. There is a best model/configuration for a specific workload and device.”**

La visual dovrebbe far vedere che vengono confrontate combinazioni di:

MODEL × QUANTIZATION × RUNTIME × CONFIGURATION × DEVICE

su dimensioni separate:

QUALITY × LATENCY × THROUGHPUT × MEMORY/RESOURCES × RELIABILITY.

Obiettivo visuale:

far percepire che Performance Lab aiuta a trovare il punto ottimale per un workload specifico, non a produrre una classifica generica di modelli.

## 9.2 Traffic Monitoring

Ruolo nella landing:

rendere visibile ciò che succede a livello di rete e mantenere esplicita la qualità dell'evidenza.

Principi:

Evidence over claims.

Observe, do not inspect.

Unknown is valid.

Traffic Monitoring completa Performance Lab: Performance Lab misura quanto bene il sistema performa; Traffic Monitoring aiuta a verificare cosa succede realmente a livello di comportamento osservabile.

## 9.3 Messaggio finale del piano

**Working ≠ performing well.**

**Performing well ≠ production ready.**

Evidence is what allows the next architecture decision.

# 10\. Chiusura -LEARN / DECIDE AGAIN

Dopo Measurement non serve una conclusione celebrativa. Serve chiudere il loop e riportare ciò che abbiamo imparato al livello Strategy.

Kicker:

THE LOOP

Titolo:

**Evidence changes the next decision.**

Body:

“What I learn from real hardware, real products and measured behavior feeds back into the next architecture choice.”

Sequenza visuale:

**DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN**

Payoff:

“That's what Local AI first ≠ Local AI only means in practice.”

Messaggio:

il risultato può essere LOCAL, HYBRID o CLOUD. Il successo non è forzare un workload in locale; è arrivare a una decisione migliore e difendibile.

# 11\. CTA finale -advisory come conseguenza

Solo dopo la chiusura del loop entra il secondo obiettivo professionale.

Heading:

Facing the same decisions?

Body:

“I also work with teams deciding what should run Local, Hybrid or Cloud.”

CTA:

Discuss an AI architecture →

Alternativa:

Discuss your workload →

Da evitare nella prima parte della landing:

Book a strategy call.

# 12\. Layout complessivo

Struttura desktop:

• Hero a due colonne: 1/3 identità, 2/3 missione;

• Roadmap in quattro capitoli verticali;

• alternanza dei piani: sinistra / destra / sinistra / destra;

• linea blu continua che attraversa orizzontalmente la pagina tra i capitoli;

• badge numerati 1–4 sulla rail;

• visual custom per ogni piano;

• closing section che richiude il percorso.

Alternanza consigliata:

Plane 1 -linea a sinistra; copy a sinistra; decision visual a destra.

Plane 2 -linea a destra; ecosystem visual a sinistra; copy a destra.

Plane 3 -linea a sinistra; copy a sinistra; app test-bed cards a destra.

Plane 4 -linea a destra; metrics/evidence visual a sinistra; copy a destra.

# 13\. Animazioni e scroll

Comportamento desktop:

• ogni stage occupa almeno la viewport disponibile sotto l'header;

• entrando nello stage, badge e linea si attivano;

• il badge entra con scale \+ glow leggero;

• la rail verticale si disegna progressivamente;

• copy e visual entrano da lati opposti coerentemente con il layout;

• gli elementi interni possono avere uno stagger leggero;

• la transizione SVG si disegna mentre lo scroll entra nella zona tra due piani;

• la pill compare durante il tracciamento della curva;

• tornando indietro, l'animazione può riattivarsi senza creare flicker o scroll lock.

Implementazione consigliata:

IntersectionObserver per l'attivazione degli stage e delle transizioni.

No scroll-jacking.

Reduced motion:

rispettare prefers-reduced-motion, mostrando contenuti direttamente senza animazioni essenziali.

# 14\. Visual language

Stile:

• sfondo bianco;

• premium cobalt blue;

• glow molto leggero;

• card pulite con border sottile;

• niente neon/sci-fi aggressivo;

• ampio white space;

• visual più diagrammatiche che decorative.

Regola fondamentale:

text explains why / meaning;

graphic shows how / where / evidence.

Evitare di duplicare lo stesso contenuto in testo e grafica.

Visual per piano:

Strategy -Local / Hybrid / Cloud decision framework.

Architecture -ecosystem.png.

Applications -question-led test-bed cards.

Observability -Performance Lab \+ Traffic Monitoring \+ metric/evidence visuals.

# 15\. Regole di contenuto

Per ogni piano:

• 1 kicker;

• 1 domanda/titolo principale;

• 1 thesis breve;

• max 4–5 punti;

• max 3–4 card/callout;

• descrizioni da 1–2 righe;

• homepage \= concetto e prova;

• project pages \= dettaglio tecnico.

Il sito non deve raccontare “tutto ciò che esiste”. Deve far capire perché ogni pezzo è necessario nella missione.

# 16\. Responsive

Tablet:

• mantenere alternanza quando lo spazio lo consente;

• ridurre l'ampiezza delle transizioni;

• evitare che la linea interferisca con il copy.

Mobile:

• niente obbligo di un piano per viewport;

• scroll naturale;

• rail semplificata sul lato;

• visual sotto il copy;

• transizioni ridotte ma ancora percepibili;

• priorità a leggibilità e ordine narrativo.

# 17\. Criteri di successo della landing

La landing funziona se un visitatore qualificato capisce in meno di un minuto:

1\. chi è Daniele;

2\. che la tesi è Local AI first ≠ Local AI only;

3\. che la domanda è quanto AI possa davvero restare sotto il nostro controllo;

4\. perché Local AI va rivalutato e quando;

5\. che l'infrastruttura è necessaria per rendere il local realmente gestibile;

6\. che le applicazioni sono test bed e non semplici portfolio projects;

7\. che funzionare non significa performare bene;

8\. che Performance Lab cerca il modello/configurazione migliore per uno specifico use case e device;

9\. che l'evidenza torna nella strategia e il risultato può essere Local, Hybrid o Cloud;

10\. che il posizionamento da strategic AI advisor emerge dalla qualità del metodo e non da una promessa commerciale anticipata.

# 18\. Relazione con il documento strategico

Questo documento non ridefinisce missione e posizionamento. Traduce il documento “08 -Local AI Strategy, Positioning & Storytelling” in layout, copy, visual, transizioni e comportamento di scroll della landing page.

