const KEY = 'farmassist-data-v1';

const defaultData = {
  user: null,
  farms: [],
  fields: [],
  crops: [],
  reports: [],
  expenses: [],
  harvests: [],
  activities: [],
  weather: null,
  language: 'en',
  loggedIn: false
};

let data = load();
let page = 'home';
let authMode = 'register';

/* =========================================================
   CROP KNOWLEDGE
   ========================================================= */

const cropsCatalog = {
  rice: {
    en: 'Rice', ta: 'நெல்', hi: 'धान', days: 120,
    stages: [['0','20','Establishment'],['21','45','Vegetative'],['46','75','Tillering'],['76','105','Flowering/Grain'],['106','999','Maturity']]
  },
  tomato: {
    en: 'Tomato', ta: 'தக்காளி', hi: 'टमाटर', days: 90,
    stages: [['0','20','Establishment'],['21','40','Vegetative'],['41','60','Flowering'],['61','90','Fruiting/Harvest']]
  },
  mango: {
    en: 'Mango', ta: 'மாம்பழம்', hi: 'आम', days: 240,
    stages: [['0','60','Vegetative'],['61','150','Flowering'],['151','240','Fruit development'],['241','300','Maturity']]
  },
  banana: {
    en: 'Banana', ta: 'வாழை', hi: 'केला', days: 300,
    stages: [['0','60','Establishment'],['61','180','Vegetative'],['181','240','Flowering'],['241','360','Fruit development']]
  },
  groundnut: {
    en: 'Groundnut', ta: 'நிலக்கடலை', hi: 'मूंगफली', days: 110,
    stages: [['0','20','Establishment'],['21','45','Vegetative'],['46','75','Flowering/Pegging'],['76','110','Pod filling/Maturity']]
  },
  maize: {
    en: 'Maize', ta: 'மக்காச்சோளம்', hi: 'मक्का', days: 110,
    stages: [['0','20','Establishment'],['21','45','Vegetative'],['46','70','Tasseling'],['71','110','Grain filling/Maturity']]
  },
  chilli: {
    en: 'Chilli', ta: 'மிளகாய்', hi: 'मिर्च', days: 150,
    stages: [['0','30','Establishment'],['31','70','Vegetative'],['71','100','Flowering'],['101','180','Fruiting/Harvest']]
  },
  onion: {
    en: 'Onion', ta: 'வெங்காயம்', hi: 'प्याज', days: 100,
    stages: [['0','25','Establishment'],['26','60','Vegetative/Bulbing'],['61','100','Bulb maturity']]
  },
  brinjal: {
    en: 'Brinjal', ta: 'கத்தரிக்காய்', hi: 'बैंगन', days: 150,
    stages: [['0','30','Establishment'],['31','70','Vegetative'],['71','100','Flowering'],['101','180','Fruiting/Harvest']]
  },
  okra: {
    en: 'Okra', ta: 'வெண்டைக்காய்', hi: 'भिंडी', days: 100,
    stages: [['0','25','Establishment'],['26','55','Vegetative'],['56','75','Flowering'],['76','120','Harvest']]
  },
  sugarcane: {
    en: 'Sugarcane', ta: 'கரும்பு', hi: 'गन्ना', days: 365,
    stages: [['0','45','Germination'],['46','120','Tillering'],['121','270','Grand growth'],['271','420','Maturity']]
  },
  cotton: {
    en: 'Cotton', ta: 'பருத்தி', hi: 'कपास', days: 180,
    stages: [['0','30','Establishment'],['31','75','Vegetative'],['76','120','Flowering'],['121','210','Boll development']]
  },
  blackgram: {
    en: 'Black gram', ta: 'உளுந்து', hi: 'उड़द', days: 80,
    stages: [['0','20','Establishment'],['21','45','Vegetative/Flowering'],['46','80','Pod filling/Maturity']]
  },
  greengram: {
    en: 'Green gram', ta: 'பாசிப்பயறு', hi: 'मूंग', days: 70,
    stages: [['0','18','Establishment'],['19','40','Vegetative/Flowering'],['41','70','Pod filling/Maturity']]
  },
  turmeric: {
    en: 'Turmeric', ta: 'மஞ்சள்', hi: 'हल्दी', days: 270,
    stages: [['0','45','Sprouting'],['46','120','Vegetative'],['121','210','Rhizome development'],['211','300','Maturity']]
  }
};

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const T = {
  en: {
    home:'Home', myFarm:'My Farm', activities:'Activities', reports:'Reports',
    weather:'Weather', finance:'Finance', analytics:'Analytics',
    assistant:'Assistant', profile:'Profile', farmManagement:'FARM MANAGEMENT',
    welcome:'Good morning!', tagline:'Your Farm. Your Records. Your Decisions.',
    desc:'A simple digital record book for your farm. Track crops, activities, expenses, weather and harvests.',
    addFarm:'Add Farm', addCrop:'Add Crop', today:'Today',
    noFarm:'Add your first farm to get started.',
    noCrop:'Add a crop to start tracking its growth and care.',
    seasonCost:'Season Cost', revenue:'Revenue', profit:'Profit / Loss',
    language:'Language', save:'Save', cancel:'Cancel', location:'Location',
    name:'Name', logout:'Logout', login:'Login', register:'Create Account',
    email:'Email', password:'Password', experience:'Farming experience (years)',
    assistantQ:'How can I help with your farm?', offline:'Offline', online:'Online',
    weatherRisk:'Weather Risk', daily:'Daily Report', expense:'Add Expense',
    harvest:'Add Harvest', profileDesc:'Your farmer profile and preferences.',
    chooseLanguage:'Choose your preferred interface language.',
    offlineNote:'Offline-first note: this MVP stores records in your browser.',
    manageFarm:'Manage farms, fields and crops.', farms:'Farms', crops:'Crops',
    noFarms:'No farms yet.', locationNotSet:'Location not set', acres:'acres',
    delete:'Delete', view:'View', day:'Day',
    stageAware:'Stage-aware checklist generated from the crop knowledge library.',
    markCompleted:'Mark completed', completed:'Completed',
    dailyActivitiesEmpty:'Add a crop first to generate daily activities.',
    digitalDiary:'Your digital farm diary.', noReports:'No daily reports yet.',
    trackFinance:'Track season costs, harvest income and profit/loss.',
    totalCost:'Total cost', records:'Records', date:'Date', category:'Category',
    amount:'Amount', noExpenses:'No expenses', qty:'Quantity', unit:'Unit',
    sellingPrice:'Selling price / unit',
    revenueFormula:'Revenue = Quantity × Selling price per unit',
    noHarvests:'No harvests',
    simpleAnalytics:"A simple view of your farm's financial history.",
    expenseBreakdown:'Expense breakdown', addExpensesAnalytics:'Add expenses to see analytics.',
    seasonSummary:'Season summary', totalExpenses:'Total expenses',
    assistantDesc:'FarmAssist uses your saved farm records and rule-based crop context in this offline MVP.',
    questionToday:'What should I check today?', questionCost:'How much have I spent?',
    questionHistory:'Show my farm history.', recordedExpenses:'Your recorded expenses total',
    historySummary:'Farm records — farms, crops, reports, expenses:',
    addCropAssistant:'Add a crop first. FarmAssist will then show stage-based checks.',
    selectQuestion:'Select a question above.', overview:'Farm overview', activeCrops:'Active crops',
    farmCount:'Farms', todayTasks:"Today's activities", quickActions:'Quick actions',
    recentReports:'Recent reports', financialOverview:'Financial overview',
    viewAll:'View all', noActivitiesToday:'No activities for today.', getStarted:'Get started',
    weatherDesc:'Location-based forecast when online; latest successful data is cached for offline viewing.',
    refresh:'Refresh', temperature:'Temperature', humidity:'Humidity',
    rainProbability:'Rain probability', wind:'Wind', forecast:'Forecast',
    weatherStatus:'Weather status', noWeather:'No weather data yet',
    weatherOffline:'Set a farm location, then press Refresh while online.',
    setFarmLocation:'Set farm location', profilePhoto:'Profile photo',
    units:'Units', notificationPreference:'Notification preference',
    workCompleted:'Work completed', irrigation:'Irrigation', cropCondition:'Crop condition',
    pestObservation:'Pest observation', diseaseObservation:'Disease observation',
    labour:'Labour', cost:'Cost', notes:'Notes', photo:'Photo',
    selectCrop:'Select crop', reportDate:'Report date', yes:'Yes', no:'No',
    good:'Good', average:'Average', needsAttention:'Needs attention',
    saveReport:'Save report', close:'Close', harvestDate:'Harvest date',
    harvestQuantity:'Harvest quantity', sellingPricePerUnit:'Selling price per unit',
    saveHarvest:'Save harvest', cancelForm:'Cancel', farmName:'Farm name',
    farmLocation:'Farm location (village/city)', area:'Area (acres)', saveFarm:'Save farm',
    plantingDate:'Planting date', crop:'Crop', saveCrop:'Save crop',
    expenseCategory:'Expense category', expenseAmount:'Amount in ₹',
    saveExpense:'Save expense', observeCondition:'Observe crop condition',
    checkMoisture:'Check soil moisture', pestDisease:'Monitor pest/disease symptoms',
    monitorFlowering:'Monitor flowering and field conditions',
    checkHarvest:'Check harvest readiness',
    noRisk:'No high rain-risk threshold detected in the retrieved forecast. Continue normal monitoring.',
    heavyRainRisk:'Potential heavy-rain conditions. Monitor drainage, waterlogging and crop condition.',
    locationNotFound:'Location not found', setLocationFirst:'Set your farm location first',
    weatherFailed:'Weather update failed; check location/internet.',
    weatherUpdated:'Weather updated', offlineCached:'You are offline. Showing cached weather if available.',
    welcomeToast:'Welcome to FarmAssist Pro', farmAdded:'Farm added', cropAdded:'Crop added',
    profileSaved:'Profile saved', reportSaved:'Daily report saved', expenseSaved:'Expense saved',
    harvestSaved:'Harvest saved', activityCompleted:'Activity marked completed',
    useCropKeys:'Use one of the listed crop keys', addCropFirst:'Add a crop first',
    addFarmFirst:'Add a farm first', deleteFarmConfirm:'Delete this farm?',
    deleteCropConfirm:'Delete this crop?', deleteReportConfirm:'Delete this report?',
    deleteExpenseConfirm:'Delete this expense?', deleteHarvestConfirm:'Delete this harvest?',
    enterHarvestDate:'Please enter a valid harvest date.',
    enterValidQuantity:'Please enter a valid quantity.',
    selectHarvestUnit:'Please select a unit.',
    enterValidPrice:'Please enter a valid selling price.',
    deleteDone:'Deleted successfully'
  },

  ta: {
    home:'முகப்பு', myFarm:'என் பண்ணை', activities:'செயல்கள்', reports:'அறிக்கைகள்',
    weather:'வானிலை', finance:'நிதி', analytics:'பகுப்பாய்வு',
    assistant:'உதவியாளர்', profile:'சுயவிவரம்', farmManagement:'பண்ணை நிர்வாகம்',
    welcome:'வணக்கம்!', tagline:'உங்கள் பண்ணை. உங்கள் பதிவுகள். உங்கள் முடிவுகள்.',
    desc:'பயிர்கள், செயல்கள், செலவுகள், வானிலை மற்றும் அறுவடைகளை பதிவு செய்யும் டிஜிட்டல் பண்ணை புத்தகம்.',
    addFarm:'பண்ணை சேர்க்க', addCrop:'பயிர் சேர்க்க', today:'இன்று',
    noFarm:'தொடங்க உங்கள் முதல் பண்ணையை சேர்க்கவும்.',
    noCrop:'பயிரின் வளர்ச்சி மற்றும் பராமரிப்பை கண்காணிக்க பயிரை சேர்க்கவும்.',
    seasonCost:'பருவ செலவு', revenue:'வருவாய்', profit:'லாபம் / நஷ்டம்',
    language:'மொழி', save:'சேமி', cancel:'ரத்து', location:'இடம்', name:'பெயர்',
    logout:'வெளியேறு', login:'உள்நுழை', register:'கணக்கு உருவாக்கு',
    email:'மின்னஞ்சல்', password:'கடவுச்சொல்', experience:'விவசாய அனுபவம் (ஆண்டுகள்)',
    assistantQ:'உங்கள் பண்ணைக்கு நான் எப்படி உதவலாம்?', offline:'ஆஃப்லைன்', online:'ஆன்லைன்',
    weatherRisk:'வானிலை அபாயம்', daily:'தினசரி அறிக்கை', expense:'செலவு சேர்க்க',
    harvest:'அறுவடை சேர்க்க', profileDesc:'உங்கள் விவசாயி சுயவிவரம் மற்றும் விருப்பங்கள்.',
    chooseLanguage:'உங்களுக்கு விருப்பமான பயன்பாட்டு மொழியைத் தேர்ந்தெடுக்கவும்.',
    offlineNote:'ஆஃப்லைன்-முதன்மை குறிப்பு: இந்த MVP பதிவுகளை உங்கள் உலாவியில் சேமிக்கிறது.',
    manageFarm:'பண்ணைகள், வயல்கள் மற்றும் பயிர்களை நிர்வகிக்கவும்.', farms:'பண்ணைகள்',
    crops:'பயிர்கள்', noFarms:'பண்ணைகள் எதுவும் இல்லை.', locationNotSet:'இடம் அமைக்கப்படவில்லை',
    acres:'ஏக்கர்', delete:'நீக்கு', view:'பார்க்க', day:'நாள்',
    stageAware:'பயிர் அறிவு தரவுத்தளத்திலிருந்து வளர்ச்சி நிலைக்கு ஏற்ப செயல்பாடுகள் உருவாக்கப்படுகின்றன.',
    markCompleted:'முடிந்ததாகக் குறி', completed:'முடிந்தது',
    dailyActivitiesEmpty:'தினசரி செயல்பாடுகளை உருவாக்க முதலில் ஒரு பயிரை சேர்க்கவும்.',
    digitalDiary:'உங்கள் டிஜிட்டல் பண்ணை நாட்குறிப்பு.', noReports:'தினசரி அறிக்கைகள் எதுவும் இல்லை.',
    trackFinance:'பருவ செலவுகள், அறுவடை வருமானம் மற்றும் லாபம்/நஷ்டத்தை கண்காணிக்கவும்.',
    totalCost:'மொத்த செலவு', records:'பதிவுகள்', date:'தேதி', category:'வகை',
    amount:'தொகை', noExpenses:'செலவுகள் எதுவும் இல்லை', qty:'அளவு', unit:'அலகு',
    sellingPrice:'ஒரு அலகின் விற்பனை விலை',
    revenueFormula:'வருவாய் = அளவு × ஒரு அலகின் விற்பனை விலை',
    noHarvests:'அறுவடை பதிவுகள் எதுவும் இல்லை',
    simpleAnalytics:'உங்கள் பண்ணையின் நிதி வரலாற்றின் எளிய பார்வை.',
    expenseBreakdown:'செலவு பிரிவு', addExpensesAnalytics:'பகுப்பாய்வைக் காண செலவுகளைச் சேர்க்கவும்.',
    seasonSummary:'பருவ சுருக்கம்', totalExpenses:'மொத்த செலவுகள்',
    assistantDesc:'இந்த ஆஃப்லைன் MVP-யில் FarmAssist உங்கள் சேமித்த பண்ணை பதிவுகள் மற்றும் விதி அடிப்படையிலான பயிர் தகவலை பயன்படுத்துகிறது.',
    questionToday:'இன்று நான் என்ன பார்க்க வேண்டும்?', questionCost:'நான் எவ்வளவு செலவு செய்துள்ளேன்?',
    questionHistory:'என் பண்ணை வரலாற்றைக் காட்டு.', recordedExpenses:'உங்கள் பதிவு செய்யப்பட்ட செலவுகள் மொத்தம்',
    historySummary:'பண்ணை பதிவுகள் — பண்ணைகள், பயிர்கள், அறிக்கைகள், செலவுகள்:',
    addCropAssistant:'முதலில் ஒரு பயிரை சேர்க்கவும். FarmAssist பின்னர் வளர்ச்சி நிலைக்கு ஏற்ப சரிபார்ப்புகளை காட்டும்.',
    selectQuestion:'மேலே உள்ள கேள்வியைத் தேர்ந்தெடுக்கவும்.', overview:'பண்ணை சுருக்கம்',
    activeCrops:'செயலில் உள்ள பயிர்கள்', farmCount:'பண்ணைகள்', todayTasks:'இன்றைய செயல்பாடுகள்',
    quickActions:'விரைவு செயல்கள்', recentReports:'சமீபத்திய அறிக்கைகள்',
    financialOverview:'நிதி சுருக்கம்', viewAll:'அனைத்தையும் காண்க',
    noActivitiesToday:'இன்றைக்கு செயல்கள் இல்லை.', getStarted:'தொடங்குங்கள்',
    weatherDesc:'ஆன்லைனில் இருப்பின் இடத்தை அடிப்படையாகக் கொண்ட வானிலை முன்னறிவிப்பு கிடைக்கும்.',
    refresh:'புதுப்பிக்க', temperature:'வெப்பநிலை', humidity:'ஈரப்பதம்',
    rainProbability:'மழை வாய்ப்பு', wind:'காற்று', forecast:'முன்னறிவிப்பு',
    weatherStatus:'வானிலை நிலை', noWeather:'வானிலை தரவு இன்னும் இல்லை',
    weatherOffline:'பண்ணை இருப்பிடத்தை அமைத்து, ஆன்லைனில் இருக்கும்போது புதுப்பிக்கவும்.',
    setFarmLocation:'பண்ணை இருப்பிடத்தை அமைக்கவும்', profilePhoto:'சுயவிவரப் படம்',
    units:'அலகுகள்', notificationPreference:'அறிவிப்பு விருப்பம்',
    workCompleted:'முடித்த வேலை', irrigation:'நீர்ப்பாசனம்', cropCondition:'பயிர் நிலை',
    pestObservation:'பூச்சி கவனிப்பு', diseaseObservation:'நோய் கவனிப்பு',
    labour:'தொழிலாளர்', cost:'செலவு', notes:'குறிப்புகள்', photo:'புகைப்படம்',
    selectCrop:'பயிரைத் தேர்ந்தெடுக்கவும்', reportDate:'அறிக்கை தேதி', yes:'ஆம்', no:'இல்லை',
    good:'நன்று', average:'சராசரி', needsAttention:'கவனம் தேவை',
    saveReport:'அறிக்கையை சேமிக்கவும்', close:'மூடு', harvestDate:'அறுவடை தேதி',
    harvestQuantity:'அறுவடை அளவு', sellingPricePerUnit:'ஒரு அலகின் விற்பனை விலை',
    saveHarvest:'அறுவடையை சேமிக்கவும்', cancelForm:'ரத்து', farmName:'பண்ணை பெயர்',
    farmLocation:'பண்ணை இருப்பிடம் (கிராமம்/நகரம்)', area:'பரப்பளவு (ஏக்கர்)', saveFarm:'பண்ணையை சேமிக்கவும்',
    plantingDate:'நடவு தேதி', crop:'பயிர்', saveCrop:'பயிரை சேமிக்கவும்',
    expenseCategory:'செலவு வகை', expenseAmount:'தொகை ₹', saveExpense:'செலவை சேமிக்கவும்',
    observeCondition:'பயிர் நிலையை கவனிக்கவும்', checkMoisture:'மண் ஈரப்பதத்தை சரிபார்க்கவும்',
    pestDisease:'பூச்சி/நோய் அறிகுறிகளை கண்காணிக்கவும்', monitorFlowering:'மலர்ச்சி மற்றும் வயல் நிலைகளை கண்காணிக்கவும்',
    checkHarvest:'அறுவடைக்கு தயாரா என சரிபார்க்கவும்',
    noRisk:'பெறப்பட்ட முன்னறிவிப்பில் அதிக மழை அபாய வரம்பு கண்டறியப்படவில்லை. வழக்கமான கண்காணிப்பை தொடரவும்.',
    heavyRainRisk:'அதிக மழை நிலை ஏற்படக்கூடும். வடிகால், நீர் தேக்கம் மற்றும் பயிர் நிலையை கண்காணிக்கவும்.',
    locationNotFound:'இருப்பிடம் கிடைக்கவில்லை', setLocationFirst:'முதலில் உங்கள் பண்ணை இருப்பிடத்தை அமைக்கவும்',
    weatherFailed:'வானிலை புதுப்பிப்பு தோல்வியடைந்தது; இருப்பிடம்/இணையத்தை சரிபார்க்கவும்.',
    weatherUpdated:'வானிலை புதுப்பிக்கப்பட்டது', offlineCached:'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்.',
    welcomeToast:'FarmAssist Pro-க்கு வரவேற்கிறோம்', farmAdded:'பண்ணை சேர்க்கப்பட்டது',
    cropAdded:'பயிர் சேர்க்கப்பட்டது', profileSaved:'சுயவிவரம் சேமிக்கப்பட்டது',
    reportSaved:'தினசரி அறிக்கை சேமிக்கப்பட்டது', expenseSaved:'செலவு சேமிக்கப்பட்டது',
    harvestSaved:'அறுவடை சேமிக்கப்பட்டது', activityCompleted:'செயல் முடிந்ததாகக் குறிக்கப்பட்டது',
    useCropKeys:'பட்டியலில் உள்ள பயிர் குறியீடுகளில் ஒன்றைப் பயன்படுத்தவும்',
    addCropFirst:'முதலில் ஒரு பயிரை சேர்க்கவும்', addFarmFirst:'முதலில் ஒரு பண்ணையை சேர்க்கவும்',
    deleteFarmConfirm:'இந்த பண்ணையை நீக்கவா?', deleteCropConfirm:'இந்த பயிரை நீக்கவா?',
    deleteReportConfirm:'இந்த அறிக்கையை நீக்கவா?', deleteExpenseConfirm:'இந்த செலவை நீக்கவா?',
    deleteHarvestConfirm:'இந்த அறுவடை பதிவை நீக்கவா?', enterHarvestDate:'சரியான அறுவடை தேதியை உள்ளிடவும்.',
    enterValidQuantity:'சரியான அளவை உள்ளிடவும்.', selectHarvestUnit:'ஒரு அலகைத் தேர்ந்தெடுக்கவும்.',
    enterValidPrice:'சரியான விற்பனை விலையை உள்ளிடவும்.', deleteDone:'வெற்றிகரமாக நீக்கப்பட்டது'
  },

  hi: {
    home:'होम', myFarm:'मेरा खेत', activities:'गतिविधियाँ', reports:'रिपोर्ट',
    weather:'मौसम', finance:'वित्त', analytics:'विश्लेषण',
    assistant:'सहायक', profile:'प्रोफ़ाइल', farmManagement:'खेत प्रबंधन',
    welcome:'नमस्ते!', tagline:'आपका खेत। आपके रिकॉर्ड। आपके निर्णय।',
    desc:'फसल, गतिविधियों, खर्च, मौसम और कटाई को दर्ज करने वाली डिजिटल कृषि डायरी।',
    addFarm:'खेत जोड़ें', addCrop:'फसल जोड़ें', today:'आज',
    noFarm:'शुरू करने के लिए अपना पहला खेत जोड़ें।',
    noCrop:'फसल की वृद्धि और देखभाल ट्रैक करने के लिए फसल जोड़ें।',
    seasonCost:'सीजन खर्च', revenue:'आय', profit:'लाभ / हानि',
    language:'भाषा', save:'सहेजें', cancel:'रद्द करें', location:'स्थान', name:'नाम',
    logout:'लॉग आउट', login:'लॉगिन', register:'खाता बनाएं', email:'ईमेल',
    password:'पासवर्ड', experience:'कृषि अनुभव (वर्ष)', assistantQ:'मैं आपके खेत में कैसे मदद कर सकता हूँ?',
    offline:'ऑफलाइन', online:'ऑनलाइन', weatherRisk:'मौसम जोखिम',
    daily:'दैनिक रिपोर्ट', expense:'खर्च जोड़ें', harvest:'कटाई जोड़ें',
    profileDesc:'आपकी किसान प्रोफ़ाइल और प्राथमिकताएँ।',
    chooseLanguage:'अपनी पसंदीदा इंटरफ़ेस भाषा चुनें।',
    offlineNote:'ऑफलाइन-फर्स्ट नोट: यह MVP रिकॉर्ड आपके ब्राउज़र में संग्रहीत करता है।',
    manageFarm:'खेत, क्षेत्र और फसलों का प्रबंधन करें।', farms:'खेत', crops:'फसलें',
    noFarms:'अभी कोई खेत नहीं है।', locationNotSet:'स्थान सेट नहीं है', acres:'एकड़',
    delete:'हटाएँ', view:'देखें', day:'दिन',
    stageAware:'फसल ज्ञान लाइब्रेरी से विकास अवस्था के अनुसार गतिविधियाँ बनाई जाती हैं।',
    markCompleted:'पूरा हुआ चिह्नित करें', completed:'पूरा हुआ',
    dailyActivitiesEmpty:'दैनिक गतिविधियाँ बनाने के लिए पहले एक फसल जोड़ें।',
    digitalDiary:'आपकी डिजिटल कृषि डायरी.', noReports:'अभी कोई दैनिक रिपोर्ट नहीं है.',
    trackFinance:'सीजन खर्च, कटाई आय और लाभ/हानि को ट्रैक करें।',
    totalCost:'कुल खर्च', records:'रिकॉर्ड', date:'तारीख', category:'श्रेणी', amount:'राशि',
    noExpenses:'कोई खर्च नहीं', qty:'मात्रा', unit:'इकाई', sellingPrice:'प्रति इकाई बिक्री मूल्य',
    revenueFormula:'आय = मात्रा × प्रति इकाई बिक्री मूल्य', noHarvests:'कोई कटाई रिकॉर्ड नहीं',
    simpleAnalytics:'आपके खेत के वित्तीय इतिहास का सरल दृश्य।', expenseBreakdown:'खर्च का विवरण',
    addExpensesAnalytics:'विश्लेषण देखने के लिए खर्च जोड़ें।', seasonSummary:'सीजन सारांश',
    totalExpenses:'कुल खर्च',
    assistantDesc:'इस ऑफलाइन MVP में FarmAssist आपके सहेजे गए खेत रिकॉर्ड और नियम-आधारित फसल संदर्भ का उपयोग करता है।',
    questionToday:'आज मुझे क्या देखना चाहिए?', questionCost:'मैंने कितना खर्च किया है?',
    questionHistory:'मेरे खेत का इतिहास दिखाएँ.', recordedExpenses:'आपके दर्ज किए गए खर्च कुल',
    historySummary:'खेत के रिकॉर्ड — खेत, फसलें, रिपोर्ट, खर्च:',
    addCropAssistant:'पहले एक फसल जोड़ें। FarmAssist फिर विकास अवस्था के अनुसार जाँच दिखाएगा।',
    selectQuestion:'ऊपर एक प्रश्न चुनें।', overview:'खेत का सारांश', activeCrops:'सक्रिय फसलें',
    farmCount:'खेत', todayTasks:'आज की गतिविधियाँ', quickActions:'त्वरित कार्य',
    recentReports:'हाल की रिपोर्ट', financialOverview:'वित्तीय सारांश',
    viewAll:'सभी देखें', noActivitiesToday:'आज के लिए कोई गतिविधि नहीं है.', getStarted:'शुरू करें',
    weatherDesc:'ऑनलाइन होने पर स्थान-आधारित मौसम पूर्वानुमान मिलता है; नवीनतम सफल डेटा ऑफलाइन देखने के लिए कैश किया जाता है।',
    refresh:'रिफ्रेश', temperature:'तापमान', humidity:'नमी', rainProbability:'बारिश की संभावना',
    wind:'हवा', forecast:'पूर्वानुमान', weatherStatus:'मौसम स्थिति', noWeather:'अभी मौसम डेटा नहीं है',
    weatherOffline:'खेत का स्थान सेट करें और ऑनलाइन रहते हुए रिफ्रेश दबाएँ।',
    setFarmLocation:'खेत का स्थान सेट करें', profilePhoto:'प्रोफ़ाइल फोटो', units:'इकाइयाँ',
    notificationPreference:'सूचना प्राथमिकता', workCompleted:'पूरा किया गया काम', irrigation:'सिंचाई',
    cropCondition:'फसल की स्थिति', pestObservation:'कीट अवलोकन', diseaseObservation:'रोग अवलोकन',
    labour:'श्रम', cost:'लागत', notes:'नोट्स', photo:'फोटो', selectCrop:'फसल चुनें',
    reportDate:'रिपोर्ट की तारीख', yes:'हाँ', no:'नहीं', good:'अच्छी', average:'औसत',
    needsAttention:'ध्यान आवश्यक', saveReport:'रिपोर्ट सहेजें', close:'बंद करें',
    harvestDate:'कटाई की तारीख', harvestQuantity:'कटाई की मात्रा',
    sellingPricePerUnit:'प्रति इकाई बिक्री मूल्य', saveHarvest:'कटाई सहेजें',
    cancelForm:'रद्द करें', farmName:'खेत का नाम', farmLocation:'खेत का स्थान (गाँव/शहर)',
    area:'क्षेत्रफल (एकड़)', saveFarm:'खेत सहेजें', plantingDate:'बुवाई/रोपण की तारीख',
    crop:'फसल', saveCrop:'फसल सहेजें', expenseCategory:'खर्च की श्रेणी',
    expenseAmount:'राशि ₹', saveExpense:'खर्च सहेजें',
    observeCondition:'फसल की स्थिति देखें', checkMoisture:'मिट्टी की नमी जाँचें',
    pestDisease:'कीट/रोग के लक्षण देखें', monitorFlowering:'फूल आने और खेत की स्थिति पर नज़र रखें',
    checkHarvest:'कटाई की तैयारी जाँचें',
    noRisk:'प्राप्त पूर्वानुमान में उच्च बारिश जोखिम सीमा नहीं मिली। सामान्य निगरानी जारी रखें।',
    heavyRainRisk:'भारी बारिश की स्थिति संभव है। जल निकासी, जलभराव और फसल की स्थिति पर नज़र रखें।',
    locationNotFound:'स्थान नहीं मिला', setLocationFirst:'पहले अपने खेत का स्थान सेट करें',
    weatherFailed:'मौसम अपडेट विफल हुआ; स्थान/इंटरनेट जाँचें.',
    weatherUpdated:'मौसम अपडेट हुआ', offlineCached:'आप ऑफलाइन हैं। कैश किया गया मौसम दिखाया जा रहा है।',
    welcomeToast:'FarmAssist Pro में आपका स्वागत है', farmAdded:'खेत जोड़ा गया',
    cropAdded:'फसल जोड़ी गई', profileSaved:'प्रोफ़ाइल सहेजी गई', reportSaved:'दैनिक रिपोर्ट सहेजी गई',
    expenseSaved:'खर्च सहेजा गया', harvestSaved:'कटाई सहेजी गई', activityCompleted:'गतिविधि पूरी हुई',
    useCropKeys:'सूची में दिए गए फसल कोड में से एक का उपयोग करें',
    addCropFirst:'पहले एक फसल जोड़ें', addFarmFirst:'पहले एक खेत जोड़ें',
    deleteFarmConfirm:'क्या यह खेत हटाएँ?', deleteCropConfirm:'क्या यह फसल हटाएँ?',
    deleteReportConfirm:'क्या यह रिपोर्ट हटाएँ?', deleteExpenseConfirm:'क्या यह खर्च हटाएँ?',
    deleteHarvestConfirm:'क्या यह कटाई रिकॉर्ड हटाएँ?',
    enterHarvestDate:'कृपया सही कटाई की तारीख दर्ज करें.',
    enterValidQuantity:'कृपया सही मात्रा दर्ज करें.', selectHarvestUnit:'कृपया इकाई चुनें.',
    enterValidPrice:'कृपया सही बिक्री मूल्य दर्ज करें.', deleteDone:'सफलतापूर्वक हटाया गया'
  }
};

const t = key => (T[data.language] || T.en)[key] || T.en[key] || key;

/* =========================================================
   STAGE TRANSLATIONS
   ========================================================= */

const stageTA = {
  Establishment:'தொடக்க நிலை', Vegetative:'வளர்ச்சி நிலை', Tillering:'தூர் கட்டும் நிலை',
  'Flowering/Grain':'மலர்ச்சி/தானிய நிலை', Maturity:'முதிர்ச்சி', Flowering:'மலர்ச்சி',
  'Fruiting/Harvest':'கனி/அறுவடை', 'Fruit development':'கனி வளர்ச்சி',
  'Flowering/Pegging':'மலர்ச்சி/காய் உருவாக்கம்', 'Pod filling/Maturity':'காய் நிரப்பு/முதிர்ச்சி',
  'Vegetative/Bulbing':'வளர்ச்சி/கிழங்கு உருவாக்கம்', 'Bulb maturity':'கிழங்கு முதிர்ச்சி',
  'Grand growth':'முக்கிய வளர்ச்சி', 'Boll development':'காய் வளர்ச்சி',
  'Vegetative/Flowering':'வளர்ச்சி/மலர்ச்சி', Sprouting:'முளைப்பு',
  'Rhizome development':'வேர் கிழங்கு வளர்ச்சி', 'Grain filling/Maturity':'தானிய நிரப்பு/முதிர்ச்சி',
  Tasseling:'கதிர் வெளிப்பாடு', Germination:'முளைப்பு', Harvest:'அறுவடை'
};

const stageHI = {
  Establishment:'स्थापना अवस्था', Vegetative:'वानस्पतिक अवस्था', Tillering:'टिलरिंग अवस्था',
  'Flowering/Grain':'फूल/दाना अवस्था', Maturity:'परिपक्वता', Flowering:'फूल अवस्था',
  'Fruiting/Harvest':'फल/कटाई अवस्था', 'Fruit development':'फल विकास',
  'Flowering/Pegging':'फूल/पेगिंग अवस्था', 'Pod filling/Maturity':'फली भरना/परिपक्वता',
  'Vegetative/Bulbing':'वानस्पतिक/बल्ब विकास', 'Bulb maturity':'बल्ब परिपक्वता',
  'Grand growth':'मुख्य वृद्धि', 'Boll development':'बॉल विकास',
  'Vegetative/Flowering':'वानस्पतिक/फूल अवस्था', Sprouting:'अंकुरण',
  'Rhizome development':'राइजोम विकास', 'Grain filling/Maturity':'दाना भरना/परिपक्वता',
  Tasseling:'टैसलिंग', Germination:'अंकुरण', Harvest:'कटाई'
};

function stageName(stage) {
  if (data.language === 'ta') return stageTA[stage] || stage;
  if (data.language === 'hi') return stageHI[stage] || stage;
  return stage;
}

/* =========================================================
   HELPERS
   ========================================================= */

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      ...defaultData,
      ...saved,
      farms: Array.isArray(saved.farms) ? saved.farms : [],
      crops: Array.isArray(saved.crops) ? saved.crops : [],
      reports: Array.isArray(saved.reports) ? saved.reports : [],
      expenses: Array.isArray(saved.expenses) ? saved.expenses : [],
      harvests: Array.isArray(saved.harvests) ? saved.harvests : [],
      activities: Array.isArray(saved.activities) ? saved.activities : []
    };
  } catch {
    return { ...defaultData };
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(data));
  render();
}

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'
  })[char]);
}

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

function id() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function cropName(key) {
  return cropsCatalog[key]?.[data.language] || cropsCatalog[key]?.en || key;
}

function cropStage(crop) {
  const start = new Date(crop.planted);
  if (Number.isNaN(start.getTime())) return { days: 0, stage: 'Recorded' };

  const days = Math.max(
    0,
    Math.floor((Date.now() - start.getTime()) / 86400000)
  );

  const stage = cropsCatalog[crop.crop]?.stages.find(
    item => days >= Number(item[0]) && days <= Number(item[1])
  );

  return {
    days,
    stage: stage ? stage[2] : 'Recorded'
  };
}

function activityName(task) {
  const map = {
    'Observe crop condition':'observeCondition',
    'Check soil moisture':'checkMoisture',
    'Record any pest or disease symptoms':'pestDisease',
    'Monitor flowering and field conditions':'monitorFlowering',
    'Check harvest readiness':'checkHarvest'
  };
  return t(map[task] || task);
}

function isActivityCompleted(cropId, task) {
  return data.activities.some(
    item =>
      item.cropId === cropId &&
      item.task === task &&
      String(item.date || '').slice(0, 10) === todayKey()
  );
}

function navItems() {
  return [
    ['home','⌂',t('home')],
    ['farm','🌾',t('myFarm')],
    ['activities','✓',t('activities')],
    ['reports','▤',t('reports')],
    ['weather','☁',t('weather')],
    ['finance','₹',t('finance')],
    ['analytics','◫',t('analytics')],
    ['assistant','✦',t('assistant')],
    ['profile','◉',t('profile')]
  ];
}

/* =========================================================
   RENDER
   ========================================================= */

function render() {
  const root = document.getElementById('app');
  if (!root) return;

  if (!data.loggedIn) {
    root.innerHTML = authPage();
    return;
  }

  root.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <img src="assets/icon.svg" alt="FarmAssist">
          <div>FarmAssist <span>Pro</span></div>
        </div>

        <div class="status">
          <span class="pill ${navigator.onLine ? '' : 'offline'}">
            ${navigator.onLine ? '● ' + t('online') : '● ' + t('offline')}
          </span>

          <select onchange="setLang(this.value)" aria-label="${t('language')}">
            <option value="en" ${data.language === 'en' ? 'selected' : ''}>English</option>
            <option value="ta" ${data.language === 'ta' ? 'selected' : ''}>தமிழ்</option>
            <option value="hi" ${data.language === 'hi' ? 'selected' : ''}>हिन्दी</option>
          </select>
        </div>
      </header>

      <div class="layout">
        <aside class="sidebar">
          <div class="sidebar-title">${t('farmManagement')}</div>

          ${navItems().map(item => `
            <button
              class="nav-btn ${page === item[0] ? 'active' : ''}"
              onclick="go('${item[0]}')"
            >
              ${item[1]} <span>${item[2]}</span>
            </button>
          `).join('')}
        </aside>

        <main class="main">
          ${pageView()}
        </main>
      </div>

      <nav class="bottom-nav">
        ${[
          ['home','⌂'],['farm','🌾'],['reports','▤'],['finance','₹'],['profile','◉']
        ].map(item => `
          <button class="${page === item[0] ? 'active' : ''}" onclick="go('${item[0]}')">
            ${item[1]}<br>${t(item[0] === 'farm' ? 'myFarm' : item[0])}
          </button>
        `).join('')}
      </nav>
    </div>
  `;
}

function pageView() {
  switch (page) {
    case 'home': return home();
    case 'farm': return farm();
    case 'activities': return activities();
    case 'reports': return reports();
    case 'weather': return weather();
    case 'finance': return finance();
    case 'analytics': return analytics();
    case 'assistant': return assistant();
    case 'profile': return profile();
    default: return home();
  }
}

/* =========================================================
   AUTH
   ========================================================= */

function authPage() {
  return `
    <div class="auth">
      <div class="auth-card">
        <div class="brand">
          <img src="assets/icon.svg" alt="FarmAssist">
          <div>FarmAssist <span>Pro</span></div>
        </div>

        <div class="tag">🌱 ${t('tagline')}</div>

        <h1>
          ${authMode === 'register' ? t('register') : t('login')}
        </h1>

        <p class="muted">${t('desc')}</p>

        <form class="form" onsubmit="authSubmit(event)">
          ${authMode === 'register' ? `
            <div class="field">
              <label>${t('name')}</label>
              <input name="name" required>
            </div>
          ` : ''}

          <div class="field">
            <label>${t('email')}</label>
            <input name="email" type="email" required>
          </div>

          <div class="field">
            <label>${t('password')}</label>
            <input name="password" type="password" minlength="4" required>
          </div>

          ${authMode === 'register' ? `
            <div class="field">
              <label>${t('language')}</label>
              <select name="language">
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          ` : ''}

          <button class="primary auth-submit" type="submit">
            ${authMode === 'register' ? t('register') : t('login')}
          </button>
        </form>

        <button class="secondary auth-toggle" onclick="toggleAuthMode()">
          ${authMode === 'register' ? t('login') : t('register')}
        </button>

        <p class="small muted auth-note">${t('offlineNote')}</p>
      </div>
    </div>
  `;
}

function toggleAuthMode() {
  authMode = authMode === 'register' ? 'login' : 'register';
  render();
}

function authSubmit(event) {
  event.preventDefault();

  const form = new FormData(event.target);
  const email = String(form.get('email') || '').trim();
  const name = String(form.get('name') || data.user?.name || 'Farmer').trim();
  const language = String(form.get('language') || data.language || 'en');

  data.user = {
    id: data.user?.id || id(),
    name: name || 'Farmer',
    email,
    language,
    location: data.user?.location || '',
    experience: data.user?.experience || '',
    createdAt: data.user?.createdAt || new Date().toISOString()
  };

  data.language = language;
  data.loggedIn = true;
  page = 'home';

  save();
  toast(t('welcomeToast'));
}

/* =========================================================
   HOME
   ========================================================= */

function home() {
  const costs = data.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const revenue = data.harvests.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0),
    0
  );
  const profit = revenue - costs;

  const acts = data.crops.flatMap(crop => {
    const stage = cropStage(crop);

    const tasks = [
      'Observe crop condition',
      'Check soil moisture',
      'Record any pest or disease symptoms'
    ];

    if (stage.stage.toLowerCase().includes('flower')) {
      tasks.push('Monitor flowering and field conditions');
    }

    if (
      stage.stage.toLowerCase().includes('maturity') ||
      stage.stage.toLowerCase().includes('harvest')
    ) {
      tasks.push('Check harvest readiness');
    }

    return tasks.map(task => ({
      crop,
      task,
      done: isActivityCompleted(crop.id, task)
    }));
  });

  const completed = acts.filter(item => item.done).length;
  const recent = [...data.reports]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const weatherData = data.weather;

  return `
    <div class="dashboard">

      <div class="hero">
        <section class="hero-card">
          <span class="tag">🌿 FarmAssist Pro</span>

          <h1>
            ${t('welcome')}
            ${esc(data.user?.name || 'Farmer')}
          </h1>

          <p>
            ${t('tagline')}<br>
            ${t('desc')}
          </p>

          <div class="actions">
            <button class="primary" onclick="addFarm()">＋ ${t('addFarm')}</button>
            <button class="secondary" onclick="addReport()">＋ ${t('daily')}</button>
          </div>
        </section>

        <div class="hero-image" aria-label="Farm">
          <div class="hero-decoration">🌾</div>
        </div>
      </div>

      <div class="section-head">
        <div>
          <h2>📊 ${t('overview')}</h2>
          <p class="muted">${t('today')} · ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div class="stat-row">
        <div class="stat">
          <div class="label">🌱 ${t('activeCrops')}</div>
          <div class="big">${data.crops.length}</div>
          <div class="small muted">${data.farms.length} ${t('farmCount')}</div>
        </div>

        <div class="stat">
          <div class="label">💰 ${t('seasonCost')}</div>
          <div class="big">₹${costs.toLocaleString('en-IN')}</div>
        </div>

        <div class="stat">
          <div class="label">💵 ${t('revenue')}</div>
          <div class="big">₹${revenue.toLocaleString('en-IN')}</div>
        </div>

        <div class="stat">
          <div class="label">📈 ${t('profit')}</div>
          <div class="big">₹${profit.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div class="grid2">
        <section class="card">
          <div class="section-head">
            <div>
              <h3>📅 ${t('todayTasks')}</h3>
              <p class="muted">${completed}/${acts.length} ${t('completed')}</p>
            </div>
            <button class="secondary" onclick="go('activities')">${t('viewAll')}</button>
          </div>

          <div class="list">
            ${
              acts.slice(0, 4).map(item => `
                <div class="list-item">
                  <div>
                    <b>${activityName(item.task)}</b>
                    <div class="small muted">
                      ${cropName(item.crop.crop)} · ${stageName(cropStage(item.crop).stage)}
                    </div>
                  </div>
                  <span class="tag">
                    ${item.done ? '✓ ' + t('completed') : t('today')}
                  </span>
                </div>
              `).join('') || `<div class="empty">${t('noActivitiesToday')}</div>`
            }
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <h3>🌦 ${t('weather')}</h3>
              <p class="muted">${weatherData ? esc(weatherData.location || 'Farm') : t('noWeather')}</p>
            </div>
            <button class="secondary" onclick="go('weather')">${t('viewAll')}</button>
          </div>

          ${
            weatherData ? `
              <div class="big">${weatherData.temp}°C</div>
              <div class="small muted">
                ${t('humidity')} ${weatherData.humidity}% ·
                ${t('rainProbability')} ${weatherData.rain}% ·
                ${t('wind')} ${weatherData.wind} km/h
              </div>

              <div class="${weatherData.risk ? 'alert' : 'success'}" style="margin-top:14px">
                <b>${weatherData.risk ? '⚠️ ' + t('weatherRisk') : '✓ ' + t('weatherStatus')}</b>
                <div class="small" style="margin-top:5px">${esc(weatherData.message)}</div>
              </div>
            ` : `
              <div class="empty">
                <div style="font-size:32px">🌤️</div>
                <p>${t('weatherOffline')}</p>
                <button class="primary" onclick="go('weather')">${t('getStarted')}</button>
              </div>
            `
          }
        </section>
      </div>

      <div class="grid2" style="margin-top:16px">
        <section class="card">
          <div class="section-head">
            <div>
              <h3>⚡ ${t('quickActions')}</h3>
              <p class="muted">${t('getStarted')}</p>
            </div>
          </div>

          <div class="actions">
            <button class="secondary" onclick="addFarm()">🏡 ${t('addFarm')}</button>
            <button class="secondary" onclick="addCrop()">🌱 ${t('addCrop')}</button>
            <button class="secondary" onclick="addExpense()">💰 ${t('expense')}</button>
            <button class="secondary" onclick="addHarvest()">🌾 ${t('harvest')}</button>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div><h3>📒 ${t('recentReports')}</h3></div>
            <button class="secondary" onclick="go('reports')">${t('viewAll')}</button>
          </div>

          <div class="list">
            ${
              recent.map(report => `
                <div class="list-item">
                  <div>
                    <b>${new Date(report.date).toLocaleDateString()}</b>
                    <div class="small muted">${esc(report.work || t('notes'))}</div>
                  </div>
                  <span class="tag">${esc(displayCondition(report))}</span>
                </div>
              `).join('') || `<div class="empty">${t('noReports')}</div>`
            }
          </div>
        </section>
      </div>

      <section class="card" style="margin-top:16px">
        <div class="section-head">
          <div>
            <h3>💹 ${t('financialOverview')}</h3>
            <p class="muted">${t('trackFinance')}</p>
          </div>
          <button class="secondary" onclick="go('finance')">${t('viewAll')}</button>
        </div>

        <div class="grid2">
          <div>
            <div class="section-head">
              <span>${t('totalCost')}</span>
              <b>₹${costs.toLocaleString('en-IN')}</b>
            </div>
            <div class="bar"><span style="width:${costs ? 100 : 0}%"></span></div>
          </div>

          <div>
            <div class="section-head">
              <span>${t('revenue')}</span>
              <b>₹${revenue.toLocaleString('en-IN')}</b>
            </div>
            <div class="bar"><span style="width:${revenue ? 100 : 0}%"></span></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* =========================================================
   FARM
   ========================================================= */

function farm() {
  const area = data.farms.reduce((sum, farmItem) => sum + Number(farmItem.area || 0), 0);

  return `
    <div class="page-head">
      <div>
        <span class="tag">🏡 ${t('myFarm')}</span>
        <h1>${t('myFarm')}</h1>
        <p class="muted">${t('manageFarm')}</p>
      </div>

      <div class="actions">
        <button class="primary" onclick="addFarm()">＋ ${t('addFarm')}</button>
        <button class="secondary" onclick="addCrop()">＋ ${t('addCrop')}</button>
      </div>
    </div>

    <div class="stat-row">
      <div class="stat"><div class="label">🏡 ${t('farms')}</div><div class="big">${data.farms.length}</div></div>
      <div class="stat"><div class="label">🌱 ${t('crops')}</div><div class="big">${data.crops.length}</div></div>
      <div class="stat"><div class="label">📐 ${t('area')}</div><div class="big">${area.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">📅 ${t('today')}</div><div class="big">${new Date().toLocaleDateString()}</div></div>
    </div>

    <div class="grid2">
      <section class="card">
        <div class="section-head">
          <div>
            <h3>🏡 ${t('farms')}</h3>
            <p class="muted">${t('manageFarm')}</p>
          </div>
        </div>

        <div class="list">
          ${
            data.farms.map(farmItem => `
              <div class="list-item">
                <div>
                  <b>${esc(farmItem.name)}</b>
                  <div class="small muted">
                    📍 ${esc(farmItem.location || t('locationNotSet'))}
                    · ${esc(farmItem.area || '0')} ${farmItem.area ? t('acres') : ''}
                  </div>
                </div>

                <button class="danger" onclick="deleteFarm('${farmItem.id}')">
                  🗑 ${t('delete')}
                </button>
              </div>
            `).join('') || `
              <div class="empty">
                🌱
                <p>${t('noFarms')}</p>
                <button class="primary" onclick="addFarm()">${t('addFarm')}</button>
              </div>
            `
          }
        </div>
      </section>

      <section class="card">
        <div class="section-head">
          <div>
            <h3>🌱 ${t('crops')}</h3>
            <p class="muted">${t('stageAware')}</p>
          </div>
        </div>

        <div class="list">
          ${
            data.crops.map(crop => {
              const stage = cropStage(crop);
              return `
                <div class="list-item">
                  <div>
                    <b>${cropName(crop.crop)}</b>
                    <div class="small muted">
                      ${esc(crop.farmName || '')}
                      · ${t('day')} ${stage.days}
                      · ${stageName(stage.stage)}
                    </div>
                  </div>

                  <button class="danger" onclick="deleteCrop('${crop.id}')">
                    🗑 ${t('delete')}
                  </button>
                </div>
              `;
            }).join('') || `
              <div class="empty">
                🌱
                <p>${t('noCrop')}</p>
                <button class="primary" onclick="addCrop()">${t('addCrop')}</button>
              </div>
            `
          }
        </div>
      </section>
    </div>
  `;
}

/* =========================================================
   ACTIVITIES
   ========================================================= */

function getActivities() {
  return data.crops.flatMap(crop => {
    const stage = cropStage(crop);
    const tasks = [
      'Observe crop condition',
      'Check soil moisture',
      'Record any pest or disease symptoms'
    ];

    if (stage.stage.toLowerCase().includes('flower')) {
      tasks.push('Monitor flowering and field conditions');
    }

    if (
      stage.stage.toLowerCase().includes('maturity') ||
      stage.stage.toLowerCase().includes('harvest')
    ) {
      tasks.push('Check harvest readiness');
    }

    return tasks.map(task => ({
      crop,
      task,
      done: isActivityCompleted(crop.id, task)
    }));
  });
}

function activities() {
  const acts = getActivities();
  const done = acts.filter(item => item.done).length;

  return `
    <div class="page-head">
      <div>
        <span class="tag">✓ ${t('activities')}</span>
        <h1>${t('activities')}</h1>
        <p class="muted">${t('stageAware')}</p>
      </div>

      <div class="tag">${done}/${acts.length} ${t('completed')}</div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <div class="section-head">
        <div>
          <h3>🌱 ${t('todayTasks')}</h3>
          <p class="muted">${t('digitalDiary')}</p>
        </div>
        <span class="tag">${t('today')}</span>
      </div>

      <div class="bar">
        <span style="width:${acts.length ? Math.round(done / acts.length * 100) : 0}%"></span>
      </div>
    </div>

    ${
      acts.length ? `
        <div class="grid">
          ${acts.map(item => {
            const stage = cropStage(item.crop);

            return `
              <div class="card">
                <div class="section-head">
                  <span class="tag">${cropName(item.crop.crop)}</span>
                  <span class="small muted">${t('day')} ${stage.days}</span>
                </div>

                <h3>${activityName(item.task)}</h3>
                <p class="muted">${stageName(stage.stage)}</p>

                <button
                  class="${item.done ? 'secondary' : 'primary'}"
                  ${item.done ? 'disabled' : ''}
                  onclick="completeActivity('${item.crop.id}','${esc(item.task)}')"
                >
                  ${item.done ? '✓ ' + t('completed') : '✓ ' + t('markCompleted')}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="empty">
          <div style="font-size:42px">🌱</div>
          <h2>${t('dailyActivitiesEmpty')}</h2>
          <button class="primary" onclick="go('farm')">${t('addCrop')}</button>
        </div>
      `
    }
  `;
}

/* =========================================================
   REPORTS
   ========================================================= */

function displayCondition(report) {
  const key = report.conditionKey;
  if (key && T[data.language]?.[key]) return t(key);
  return report.condition || t('good');
}

function reports() {
  const items = [...data.reports].sort((a, b) => new Date(b.date) - new Date(a.date));

  const cropCount = new Set(
    items.map(item => resolveCrop(item)?.id).filter(Boolean)
  ).size;

  const totalCost = items.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const todayCount = items.filter(
    item => String(item.date || '').slice(0, 10) === todayKey()
  ).length;

  return `
    <div class="page-head">
      <div>
        <span class="tag">📒 ${t('reports')}</span>
        <h1>${t('reports')}</h1>
        <p class="muted">${t('digitalDiary')}</p>
      </div>

      <button class="primary" onclick="addReport()">
        ＋ ${t('daily')}
      </button>
    </div>

    <div class="stat-row">
      <div class="stat">
        <div class="label">📒 ${t('records')}</div>
        <div class="big">${items.length}</div>
      </div>

      <div class="stat">
        <div class="label">📅 ${t('today')}</div>
        <div class="big">${todayCount}</div>
      </div>

      <div class="stat">
        <div class="label">💰 ${t('cost')}</div>
        <div class="big">₹${totalCost.toLocaleString('en-IN')}</div>
      </div>

      <div class="stat">
        <div class="label">🌱 ${t('crops')}</div>
        <div class="big">${cropCount}</div>
      </div>
    </div>

    <div class="list">
      ${
        items.map(report => reportCard(report)).join('') || `
          <div class="empty">
            <div style="font-size:42px">📒</div>
            <h2>${t('noReports')}</h2>
            <button class="primary" onclick="addReport()">＋ ${t('daily')}</button>
          </div>
        `
      }
    </div>
  `;
}

function resolveCrop(report) {
  if (report.cropId) {
    const byId = data.crops.find(crop => crop.id === report.cropId);
    if (byId) return byId;
  }

  if (report.crop) {
    return (
      data.crops.find(crop => crop.id === report.crop) ||
      data.crops.find(crop => crop.crop === report.crop)
    );
  }

  if (data.crops.length === 1) return data.crops[0];

  return null;
}

function reportCard(report) {
  const crop = resolveCrop(report);
  const cropLabel = crop ? cropName(crop.crop) : '-';

  const photo = report.photo ? `
    <img
      src="${report.photo}"
      alt="${t('photo')}"
      style="width:100%;max-height:280px;object-fit:cover;border-radius:16px;margin-top:14px"
    >
  ` : '';

  return `
    <article class="card">

      <div class="section-head">
        <div>
          <span class="tag">
            📅 ${new Date(report.date).toLocaleDateString()}
          </span>

          <h3 style="margin-top:10px">
            ${esc(report.work || t('notes'))}
          </h3>
        </div>

        <div class="actions">
          <span class="tag">${esc(displayCondition(report))}</span>

          <button
            class="danger"
            onclick="deleteReport('${report.id}')"
          >
            🗑 ${t('delete')}
          </button>
        </div>
      </div>

      <div class="grid2">

        <div class="small muted">
          🌱 ${t('crop')}: <b>${esc(cropLabel)}</b><br>
          💧 ${t('irrigation')}: ${report.irrigation ? t('yes') : t('no')}<br>
          👷 ${t('labour')}: ${esc(report.labour ?? '0')}
        </div>

        <div class="small muted">
          🐛 ${t('pestObservation')}: ${esc(report.pestObservation || '-')}<br>
          🦠 ${t('diseaseObservation')}: ${esc(report.diseaseObservation || '-')}<br>
          💰 ${t('cost')}: ₹${Number(report.cost || 0).toLocaleString('en-IN')}
        </div>

      </div>

      ${report.note ? `<p class="muted">📓 ${esc(report.note)}</p>` : ''}
      ${photo}
    </article>
  `;
}

/* =========================================================
   WEATHER
   ========================================================= */

function weather() {
  const weatherData = data.weather;

  return `
    <div class="section-head">
      <div>
        <h1>🌦️ ${t('weather')}</h1>
        <p class="muted">${t('weatherDesc')}</p>
      </div>

      <button class="primary" onclick="getWeather()">
        ${t('refresh')}
      </button>
    </div>

    ${
      weatherData ? `
        <div class="grid">

          <div class="card">
            <div class="label">${t('location')}</div>
            <div class="big">${esc(weatherData.location || 'Farm')}</div>
          </div>

          <div class="card">
            <div class="label">${t('temperature')}</div>
            <div class="big">${weatherData.temp}°C</div>
            <p class="muted">${t('humidity')} ${weatherData.humidity}%</p>
          </div>

          <div class="card">
            <div class="label">${t('rainProbability')}</div>
            <div class="big">${weatherData.rain}%</div>
            <p class="muted">${t('wind')} ${weatherData.wind} km/h</p>
          </div>

        </div>

        <div style="height:16px"></div>

        <div class="${weatherData.risk ? 'alert' : 'success'}">
          <b>
            ${weatherData.risk ? '⚠️ ' + t('weatherRisk') : '✓ ' + t('weatherStatus')}
          </b>
          <p style="margin-bottom:0">${esc(weatherData.message)}</p>
        </div>

        <div style="height:16px"></div>

        <section class="card">
          <h3>${t('forecast')}</h3>

          <div class="list">
            ${(weatherData.days || []).map(day => `
              <div class="list-item">
                <b>${esc(day.date)}</b>
                <span>${day.temp}°C · ${t('rainProbability').toLowerCase()} ${day.rain}%</span>
              </div>
            `).join('')}
          </div>
        </section>
      ` : `
        <div class="empty">
          <h2>🌦️ ${t('noWeather')}</h2>
          <p class="muted">${t('weatherOffline')}</p>
          <button class="primary" onclick="go('farm')">${t('setFarmLocation')}</button>
        </div>
      `
    }
  `;
}

/* =========================================================
   FINANCE
   ========================================================= */

function finance() {
  const costs = data.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const revenue = data.harvests.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0),
    0
  );
  const profit = revenue - costs;

  const categories = {};
  data.expenses.forEach(item => {
    const category = String(item.category || 'Other');
    categories[category] = (categories[category] || 0) + Number(item.amount || 0);
  });

  const max = Math.max(0, ...Object.values(categories));

  return `
    <div class="page-head">
      <div>
        <span class="tag">💰 ${t('finance')}</span>
        <h1>${t('finance')}</h1>
        <p class="muted">${t('trackFinance')}</p>
      </div>

      <div class="actions">
        <button class="primary" onclick="addExpense()">＋ ${t('expense')}</button>
        <button class="secondary" onclick="addHarvest()">＋ ${t('harvest')}</button>
      </div>
    </div>

    <div class="stat-row">
      <div class="stat"><div class="label">💸 ${t('totalCost')}</div><div class="big">₹${costs.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">💵 ${t('revenue')}</div><div class="big">₹${revenue.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">📈 ${t('profit')}</div><div class="big">₹${profit.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">🧾 ${t('records')}</div><div class="big">${data.expenses.length + data.harvests.length}</div></div>
    </div>

    <div class="grid2">

      <section class="card">
        <div class="section-head">
          <div>
            <h3>📉 ${t('expenseBreakdown')}</h3>
            <p class="muted">${t('totalExpenses')}</p>
          </div>
        </div>

        ${
          Object.entries(categories).map(([category, amount]) => `
            <div style="margin:15px 0">
              <div class="section-head">
                <span>${esc(category)}</span>
                <b>₹${amount.toLocaleString('en-IN')}</b>
              </div>

              <div class="bar">
                <span style="width:${max ? Math.round(amount / max * 100) : 0}%"></span>
              </div>
            </div>
          `).join('') || `<div class="empty">${t('addExpensesAnalytics')}</div>`
        }
      </section>

      <section class="card">
        <div class="section-head">
          <div>
            <h3>🧮 ${t('revenue')}</h3>
            <p class="muted">${t('revenueFormula')}</p>
          </div>
        </div>

        <div class="success">
          <b>${t('revenueFormula')}</b>
          <p>
            ${
              data.harvests.length
                ? data.harvests.map(item =>
                    `${Number(item.quantity).toLocaleString('en-IN')} ${esc(item.unit)} × ₹${Number(item.price).toLocaleString('en-IN')}`
                  ).join(' + ')
                : '0'
            }
          </p>
          <div class="big">₹${revenue.toLocaleString('en-IN')}</div>
        </div>
      </section>

    </div>

    <div class="grid2" style="margin-top:16px">

      <section class="card">
        <div class="section-head">
          <h3>🧾 ${t('expense')}</h3>
        </div>

        <div style="overflow:auto">
          <table class="table">
            <thead>
              <tr>
                <th>${t('date')}</th>
                <th>${t('category')}</th>
                <th>${t('amount')}</th>
                <th>${t('delete')}</th>
              </tr>
            </thead>

            <tbody>
              ${
                data.expenses.map(item => `
                  <tr>
                    <td>${new Date(item.date).toLocaleDateString()}</td>
                    <td>${esc(item.category)}</td>
                    <td>₹${Number(item.amount).toLocaleString('en-IN')}</td>
                    <td>
                      <button
                        class="danger"
                        onclick="deleteExpense('${item.id}')"
                      >
                        🗑 ${t('delete')}
                      </button>
                    </td>
                  </tr>
                `).join('') || `
                  <tr>
                    <td colspan="4">${t('noExpenses')}</td>
                  </tr>
                `
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <div class="section-head">
          <h3>🌾 ${t('harvest')}</h3>
        </div>

        <div style="overflow:auto">
          <table class="table">
            <thead>
              <tr>
                <th>${t('date')}</th>
                <th>${t('qty')}</th>
                <th>${t('sellingPrice')}</th>
                <th>${t('revenue')}</th>
                <th>${t('delete')}</th>
              </tr>
            </thead>

            <tbody>
              ${
                data.harvests.map(item => `
                  <tr>
                    <td>${new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      ${Number(item.quantity).toLocaleString('en-IN')}
                      ${esc(item.unit)}
                    </td>
                    <td>₹${Number(item.price).toLocaleString('en-IN')}</td>
                    <td>
                      <b>
                        ₹${(
                          Number(item.quantity) *
                          Number(item.price)
                        ).toLocaleString('en-IN')}
                      </b>
                    </td>
                    <td>
                      <button
                        class="danger"
                        onclick="deleteHarvest('${item.id}')"
                      >
                        🗑 ${t('delete')}
                      </button>
                    </td>
                  </tr>
                `).join('') || `
                  <tr>
                    <td colspan="5">${t('noHarvests')}</td>
                  </tr>
                `
              }
            </tbody>
          </table>
        </div>
      </section>

    </div>
  `;
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function analytics() {
  const categories = {};

  data.expenses.forEach(item => {
    const category = String(item.category || 'Other');
    categories[category] =
      (categories[category] || 0) + Number(item.amount || 0);
  });

  const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
  const revenue = data.harvests.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0),
    0
  );
  const profit = revenue - total;

  return `
    <div class="page-head">
      <div>
        <span class="tag">📊 ${t('analytics')}</span>
        <h1>${t('analytics')}</h1>
        <p class="muted">${t('simpleAnalytics')}</p>
      </div>
    </div>

    <div class="stat-row">
      <div class="stat"><div class="label">💸 ${t('totalExpenses')}</div><div class="big">₹${total.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">💵 ${t('revenue')}</div><div class="big">₹${revenue.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">📈 ${t('profit')}</div><div class="big">₹${profit.toLocaleString('en-IN')}</div></div>
      <div class="stat"><div class="label">🌱 ${t('crops')}</div><div class="big">${data.crops.length}</div></div>
    </div>

    <div class="grid2">
      <section class="card">
        <div class="section-head">
          <div>
            <h3>📉 ${t('expenseBreakdown')}</h3>
            <p class="muted">${t('totalExpenses')}</p>
          </div>
        </div>

        ${
          Object.entries(categories).map(([category, value]) => `
            <div style="margin:15px 0">
              <div class="section-head">
                <span>${esc(category)}</span>
                <b>₹${value.toLocaleString('en-IN')}</b>
              </div>
              <div class="bar">
                <span style="width:${total ? Math.round(value / total * 100) : 0}%"></span>
              </div>
              <div class="small muted">${total ? Math.round(value / total * 100) : 0}%</div>
            </div>
          `).join('') || `<div class="empty">${t('addExpensesAnalytics')}</div>`
        }
      </section>

      <section class="card">
        <div class="section-head">
          <div>
            <h3>🌱 ${t('crops')}</h3>
            <p class="muted">${t('stageAware')}</p>
          </div>
        </div>

        <div class="list">
          ${
            data.crops.map(crop => {
              const stage = cropStage(crop);
              return `
                <div class="list-item">
                  <div>
                    <b>${cropName(crop.crop)}</b>
                    <div class="small muted">
                      ${t('day')} ${stage.days} · ${stageName(stage.stage)}
                    </div>
                  </div>
                  <span class="tag">${esc(crop.farmName || '')}</span>
                </div>
              `;
            }).join('') || `<div class="empty">${t('noCrop')}</div>`
          }
        </div>
      </section>
    </div>

    <section class="card" style="margin-top:16px">
      <div class="section-head">
        <div>
          <h3>💹 ${t('seasonSummary')}</h3>
          <p class="muted">${t('simpleAnalytics')}</p>
        </div>
      </div>

      <div class="list">
        <div class="list-item"><span>${t('totalExpenses')}</span><b>₹${total.toLocaleString('en-IN')}</b></div>
        <div class="list-item"><span>${t('revenue')}</span><b>₹${revenue.toLocaleString('en-IN')}</b></div>
        <div class="list-item"><span>${t('profit')}</span><b>₹${profit.toLocaleString('en-IN')}</b></div>
      </div>
    </section>
  `;
}

/* =========================================================
   ASSISTANT
   ========================================================= */

function assistant() {
  return `
    <div class="section-head">
      <div>
        <h1>🤖 ${t('assistant')}</h1>
        <p class="muted">${t('assistantDesc')}</p>
      </div>
    </div>

    <div class="card">
      <h2>${t('assistantQ')}</h2>

      <div class="actions" style="margin:14px 0">
        <button class="secondary" onclick="ask('today')">${t('questionToday')}</button>
        <button class="secondary" onclick="ask('cost')">${t('questionCost')}</button>
        <button class="secondary" onclick="ask('history')">${t('questionHistory')}</button>
      </div>

      <div id="answer" class="success">${t('selectQuestion')}</div>
    </div>
  `;
}

function ask(type) {
  let answer = '';

  if (type === 'cost') {
    const total = data.expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    answer = `${t('recordedExpenses')} ₹${total.toLocaleString('en-IN')}.`;
  } else if (type === 'history') {
    answer = `${t('historySummary')} ${data.farms.length} · ${data.crops.length} · ${data.reports.length} · ${data.expenses.length}.`;
  } else {
    answer = data.crops.length
      ? data.crops.map(crop => {
          const stage = cropStage(crop);
          return `${cropName(crop.crop)}: ${stageName(stage.stage)}. ${activityName('Observe crop condition')}, ${activityName('Check soil moisture')}, ${activityName('Record any pest or disease symptoms')}.`;
        }).join(' ')
      : t('addCropAssistant');
  }

  const el = document.getElementById('answer');
  if (el) el.textContent = answer;
}

/* =========================================================
   PROFILE
   ========================================================= */

function profile() {
  return `
    <div class="section-head">
      <div>
        <h1>👤 ${t('profile')}</h1>
        <p class="muted">${t('profileDesc')}</p>
      </div>
    </div>

    <div class="grid2">

      <div class="card">
        <div class="actions">
          <div class="photo">👨‍🌾</div>

          <div>
            <h2 style="margin:5px 0">${esc(data.user?.name || 'Farmer')}</h2>
            <p class="muted">${esc(data.user?.email || '')}</p>
          </div>
        </div>

        <hr style="border:0;border-top:1px solid var(--line);margin:18px 0">

        <form class="form" onsubmit="saveProfile(event)">

          <div class="field">
            <label>${t('name')}</label>
            <input name="name" value="${esc(data.user?.name || '')}">
          </div>

          <div class="field">
            <label>${t('location')}</label>
            <input name="location" value="${esc(data.user?.location || '')}">
          </div>

          <div class="field">
            <label>${t('experience')}</label>
            <input
              name="experience"
              type="number"
              min="0"
              value="${esc(data.user?.experience || '')}"
            >
          </div>

          <button class="primary" type="submit">${t('save')}</button>
        </form>
      </div>

      <div class="card">
        <h3>${t('language')}</h3>
        <p class="muted">${t('chooseLanguage')}</p>

        <select onchange="setLang(this.value)">
          <option value="en" ${data.language === 'en' ? 'selected' : ''}>English</option>
          <option value="ta" ${data.language === 'ta' ? 'selected' : ''}>தமிழ்</option>
          <option value="hi" ${data.language === 'hi' ? 'selected' : ''}>हिन्दी</option>
        </select>

        <hr style="border:0;border-top:1px solid var(--line);margin:20px 0">

        <button class="danger" onclick="logout()">
          ${t('logout')}
        </button>

        <p class="small muted" style="margin-top:18px">
          ${t('offlineNote')}
        </p>
      </div>
    </div>
  `;
}

function saveProfile(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  data.user.name = String(form.get('name') || '').trim();
  data.user.location = String(form.get('location') || '').trim();
  data.user.experience = String(form.get('experience') || '').trim();

  save();
  toast(t('profileSaved'));
}

function setLang(value) {
  data.language = value;
  if (data.user) data.user.language = value;
  save();
}

function go(nextPage) {
  page = nextPage;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function logout() {
  data.loggedIn = false;
  save();
}

/* =========================================================
   MODALS
   ========================================================= */

function openModal(title, body) {
  let modal = document.getElementById('form-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'form-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div class="section-head">
        <h2>${esc(title)}</h2>
        <button class="secondary" type="button" onclick="closeModal()">${t('close')}</button>
      </div>
      ${body}
    </div>
  `;

  modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('form-modal');
  if (modal) modal.classList.remove('show');
}

/* =========================================================
   FARM CRUD
   ========================================================= */

function addFarm() {
  openModal(t('addFarm'), `
    <form class="form" onsubmit="saveFarmForm(event)">

      <div class="field">
        <label>${t('farmName')}</label>
        <input name="name" required>
      </div>

      <div class="field">
        <label>${t('farmLocation')}</label>
        <input name="location">
      </div>

      <div class="field">
        <label>${t('area')}</label>
        <input name="area" type="number" min="0" step="0.01">
      </div>

      <button class="primary" type="submit">${t('saveFarm')}</button>
    </form>
  `);
}

function saveFarmForm(event) {
  event.preventDefault();

  const form = new FormData(event.target);
  const name = String(form.get('name') || '').trim();

  if (!name) return;

  data.farms.push({
    id: id(),
    name,
    location: String(form.get('location') || '').trim(),
    area: String(form.get('area') || '').trim(),
    createdAt: new Date().toISOString()
  });

  save();
  closeModal();
  toast(t('farmAdded'));
}

function deleteFarm(farmId) {
  if (!confirm(t('deleteFarmConfirm'))) return;

  data.farms = data.farms.filter(item => item.id !== farmId);
  data.crops = data.crops.filter(item => item.farmId !== farmId);

  save();
  toast(t('deleteDone'));
}

/* =========================================================
   CROP CRUD
   ========================================================= */

function addCrop() {
  if (!data.farms.length) {
    toast(t('addFarmFirst'));
    return;
  }

  openModal(t('addCrop'), `
    <form class="form" onsubmit="saveCropForm(event)">

      <div class="field">
        <label>${t('crop')}</label>

        <select name="crop" required>
          ${Object.entries(cropsCatalog).map(([key, value]) => `
            <option value="${key}">
              ${esc(value[data.language] || value.en)}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="field">
        <label>${t('plantingDate')}</label>
        <input name="planted" type="date" value="${todayKey()}" required>
      </div>

      <button class="primary" type="submit">${t('saveCrop')}</button>
    </form>
  `);
}

function saveCropForm(event) {
  event.preventDefault();

  const form = new FormData(event.target);
  const farm = data.farms[0];

  if (!farm) {
    toast(t('addFarmFirst'));
    return;
  }

  data.crops.push({
    id: id(),
    crop: String(form.get('crop')),
    farmId: farm.id,
    farmName: farm.name,
    planted: String(form.get('planted'))
  });

  save();
  closeModal();
  toast(t('cropAdded'));
}

function deleteCrop(cropId) {
  if (!confirm(t('deleteCropConfirm'))) return;

  data.crops = data.crops.filter(item => item.id !== cropId);
  data.activities = data.activities.filter(item => item.cropId !== cropId);
  data.reports = data.reports.filter(item => item.cropId !== cropId);

  save();
  toast(t('deleteDone'));
}

/* =========================================================
   DAILY REPORT CRUD
   ========================================================= */

function addReport() {
  if (!data.crops.length) {
    toast(t('addCropFirst'));
    return;
  }

  openModal(t('daily'), `
    <form class="form" onsubmit="saveReportForm(event)">

      <div class="grid2">

        <div class="field">
          <label>${t('reportDate')}</label>
          <input name="date" type="date" value="${todayKey()}" required>
        </div>

        <div class="field">
          <label>${t('selectCrop')}</label>

          <select name="cropId" required>
            ${data.crops.map(crop => `
              <option value="${crop.id}">
                ${esc(cropName(crop.crop))} · ${esc(crop.farmName || '')}
              </option>
            `).join('')}
          </select>
        </div>

      </div>

      <div class="field">
        <label>${t('workCompleted')}</label>
        <textarea name="work" rows="3" required></textarea>
      </div>

      <div class="grid2">

        <div class="field">
          <label>${t('irrigation')}</label>

          <select name="irrigation">
            <option value="true">${t('yes')}</option>
            <option value="false">${t('no')}</option>
          </select>
        </div>

        <div class="field">
          <label>${t('cropCondition')}</label>

          <select name="conditionKey">
            <option value="good">${t('good')}</option>
            <option value="average">${t('average')}</option>
            <option value="needsAttention">${t('needsAttention')}</option>
          </select>
        </div>

      </div>

      <div class="grid2">

        <div class="field">
          <label>${t('pestObservation')}</label>
          <textarea name="pestObservation" rows="2"></textarea>
        </div>

        <div class="field">
          <label>${t('diseaseObservation')}</label>
          <textarea name="diseaseObservation" rows="2"></textarea>
        </div>

      </div>

      <div class="grid2">

        <div class="field">
          <label>${t('labour')}</label>
          <input name="labour" type="number" min="0" step="1" value="0">
        </div>

        <div class="field">
          <label>${t('cost')}</label>
          <input name="cost" type="number" min="0" step="0.01" value="0">
        </div>

      </div>

      <div class="field">
        <label>${t('notes')}</label>
        <textarea name="note" rows="3"></textarea>
      </div>

      <div class="field">
        <label>${t('photo')}</label>
        <input name="photo" type="file" accept="image/*">
      </div>

      <button class="primary" type="submit">
        ${t('saveReport')}
      </button>

    </form>
  `);
}

function saveReportForm(event) {
  event.preventDefault();

  const formElement = event.target;
  const form = new FormData(formElement);
  const file = formElement.photo?.files?.[0];

  const finish = (photo = '') => {
    const date = String(form.get('date') || '');

    if (!date) return;

    data.reports.unshift({
      id: id(),
      date: new Date(`${date}T12:00:00`).toISOString(),
      cropId: String(form.get('cropId') || ''),
      work: String(form.get('work') || ''),
      irrigation: String(form.get('irrigation')) === 'true',
      conditionKey: String(form.get('conditionKey') || 'good'),
      condition: String(form.get('conditionKey') || 'good'),
      pestObservation: String(form.get('pestObservation') || ''),
      diseaseObservation: String(form.get('diseaseObservation') || ''),
      labour: Number(form.get('labour') || 0),
      cost: Number(form.get('cost') || 0),
      note: String(form.get('note') || ''),
      photo
    });

    save();
    closeModal();
    toast(t('reportSaved'));
  };

  if (!file) {
    finish();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => finish(String(reader.result));
  reader.readAsDataURL(file);
}

function deleteReport(reportId) {
  if (!confirm(t('deleteReportConfirm'))) return;

  data.reports = data.reports.filter(item => item.id !== reportId);

  save();
  toast(t('deleteDone'));
}

/* =========================================================
   ACTIVITY CRUD
   ========================================================= */

function completeActivity(cropId, task) {
  if (isActivityCompleted(cropId, task)) {
    toast(t('completed'));
    return;
  }

  data.activities.push({
    id: id(),
    cropId,
    task,
    date: new Date().toISOString()
  });

  save();
  toast(t('activityCompleted'));
}

/* =========================================================
   EXPENSE CRUD
   ========================================================= */

function addExpense() {
  openModal(t('expense'), `
    <form class="form" onsubmit="saveExpenseForm(event)">

      <div class="field">
        <label>${t('expenseCategory')}</label>

        <select name="category">
          <option>Seeds</option>
          <option>Inputs</option>
          <option>Labour</option>
          <option>Irrigation</option>
          <option>Equipment</option>
          <option>Transport</option>
          <option>Other</option>
        </select>
      </div>

      <div class="field">
        <label>${t('expenseAmount')}</label>
        <input name="amount" type="number" min="0" step="0.01" required>
      </div>

      <button class="primary" type="submit">${t('saveExpense')}</button>
    </form>
  `);
}

function saveExpenseForm(event) {
  event.preventDefault();

  const form = new FormData(event.target);
  const amount = Number(form.get('amount'));

  if (!Number.isFinite(amount) || amount < 0) return;

  data.expenses.push({
    id: id(),
    date: new Date().toISOString(),
    category: String(form.get('category') || 'Other'),
    amount
  });

  save();
  closeModal();
  toast(t('expenseSaved'));
}

function deleteExpense(expenseId) {
  const expense = data.expenses.find(item => item.id === expenseId);
  if (!expense) return;

  if (!confirm(
    `${t('deleteExpenseConfirm')}\n₹${Number(expense.amount || 0).toLocaleString('en-IN')}`
  )) {
    return;
  }

  data.expenses = data.expenses.filter(item => item.id !== expenseId);

  save();
  toast(t('deleteDone'));
}

/* =========================================================
   HARVEST CRUD
   ========================================================= */

function addHarvest() {
  openModal(t('harvest'), `
    <form
      id="harvest-form"
      class="form"
      novalidate
      onsubmit="saveHarvestForm(event)"
      oninput="updateHarvestPreview()"
    >

      <div class="field">
        <label>${t('harvestDate')}</label>
        <input name="date" type="date" value="${todayKey()}" required>
      </div>

      <div class="field">
        <label>${t('harvestQuantity')}</label>
        <input name="quantity" type="number" min="0.01" step="0.01" required>
      </div>

      <div class="field">
        <label>${t('unit')}</label>

        <select name="unit">
          <option>kg</option>
          <option>quintal</option>
          <option>tonne</option>
          <option>bags</option>
          <option>pieces</option>
        </select>
      </div>

      <div class="field">
        <label>${t('sellingPricePerUnit')}</label>
        <input name="price" type="number" min="0.01" step="0.01" required>
      </div>

      <div id="harvest-preview" class="success">
        ${t('revenueFormula')}: ₹0
      </div>

      <button class="primary" type="submit">
        ${t('saveHarvest')}
      </button>

    </form>
  `);
}

function updateHarvestPreview() {
  const quantity = Number(
    document.querySelector('#harvest-form [name=quantity]')?.value || 0
  );

  const price = Number(
    document.querySelector('#harvest-form [name=price]')?.value || 0
  );

  const preview = document.getElementById('harvest-preview');

  if (preview) {
    preview.textContent =
      `${t('revenueFormula')}: ₹${(quantity * price).toLocaleString('en-IN')}`;
  }
}

function saveHarvestForm(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  const date = String(form.get('date') || '');
  const quantity = Number(form.get('quantity'));
  const unit = String(form.get('unit') || '').trim();
  const price = Number(form.get('price'));

  if (!date) {
    toast(t('enterHarvestDate'));
    return;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    toast(t('enterValidQuantity'));
    return;
  }

  if (!unit) {
    toast(t('selectHarvestUnit'));
    return;
  }

  if (!Number.isFinite(price) || price <= 0) {
    toast(t('enterValidPrice'));
    return;
  }

  const harvestDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(harvestDate.getTime())) {
    toast(t('enterHarvestDate'));
    return;
  }

  data.harvests.push({
    id: id(),
    date: harvestDate.toISOString(),
    quantity,
    unit,
    price
  });

  save();
  closeModal();
  toast(t('harvestSaved'));
}

function deleteHarvest(harvestId) {
  const harvest = data.harvests.find(item => item.id === harvestId);
  if (!harvest) return;

  const revenue =
    Number(harvest.quantity || 0) *
    Number(harvest.price || 0);

  if (!confirm(
    `${t('deleteHarvestConfirm')}\n₹${revenue.toLocaleString('en-IN')}`
  )) {
    return;
  }

  data.harvests = data.harvests.filter(item => item.id !== harvestId);

  save();
  toast(t('deleteDone'));
}

/* =========================================================
   WEATHER API
   ========================================================= */

async function getWeather() {
  if (!navigator.onLine) {
    toast(t('offlineCached'));
    return;
  }

  const farmItem = data.farms[0];
  const location = farmItem?.location || data.user?.location;

  if (!location) {
    toast(t('setLocationFirst'));
    return;
  }

  try {
    const geocodeResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    );

    if (!geocodeResponse.ok) {
      throw new Error('Geocoding failed');
    }

    const geocode = await geocodeResponse.json();

    if (!geocode.results?.[0]) {
      throw new Error('Location not found');
    }

    const { latitude, longitude, name, country } = geocode.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=precipitation_probability,temperature_2m&forecast_days=3&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error('Weather request failed');
    }

    const weather = await weatherResponse.json();
    const current = weather.current;
    const rainValues = weather.hourly?.precipitation_probability || [];

    const maxRain = Math.max(...rainValues.slice(0, 24), 0);
    const risk = maxRain >= 60 || Number(current?.precipitation || 0) > 10;

    data.weather = {
      location: `${name}, ${country || ''}`,
      temp: Math.round(Number(current.temperature_2m || 0)),
      humidity: Number(current.relative_humidity_2m || 0),
      wind: Math.round(Number(current.wind_speed_10m || 0)),
      rain: maxRain,
      risk,
      message: risk ? t('heavyRainRisk') : t('noRisk'),
      days: [0, 1, 2].map(dayIndex => {
        const values = rainValues.slice(dayIndex * 24, (dayIndex + 1) * 24);

        return {
          date: new Date(Date.now() + dayIndex * 86400000).toLocaleDateString(),
          temp: Math.round(
            Number(weather.hourly?.temperature_2m?.[dayIndex * 24] || 0)
          ),
          rain: Math.max(...values, 0)
        };
      })
    };

    save();
    toast(t('weatherUpdated'));
  } catch {
    toast(t('weatherFailed'));
  }
}

/* =========================================================
   ONLINE / OFFLINE + SERVICE WORKER
   ========================================================= */

window.addEventListener('online', render);
window.addEventListener('offline', render);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .catch(error => console.error('Service worker registration failed:', error));
  });
}

render();
