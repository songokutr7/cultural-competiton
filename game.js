const settings = JSON.parse(localStorage.getItem('challengeSettings') || '{}');

const fixedTeamPalette = ['#4CC9F0', '#5DD39E', '#FF7CC8', '#F8D75B', '#A78BFA', '#7DD3FC'];

const fallbackTeams = [
  { name: 'الفريق الأزرق', color: '#4CC9F0' },
  { name: 'الفريق الأخضر', color: '#5DD39E' },
  { name: 'الفريق الوردي', color: '#FF7CC8' },
  { name: 'الفريق الذهبي', color: '#F8D75B' }
];

const questionBank = {
  easy: [
    { id: 1, text: 'كم عدد سور القرآن الكريم؟', correct: '114', options: ['110', '114', '120', '112'] },
    { id: 2, text: 'أطول سورة في القرآن الكريم هي:', correct: 'البقرة', options: ['آل عمران', 'النساء', 'البقرة', 'المائدة'] },
    { id: 3, text: 'أقصر سورة في القرآن الكريم هي:', correct: 'الكوثر', options: ['النصر', 'الإخلاص', 'الكوثر', 'الفلق'] },
    { id: 4, text: 'السورة التي تُعدل ثلث القرآن هي:', correct: 'الإخلاص', options: ['الفلق', 'الإخلاص', 'الناس', 'الكافرون'] },
    { id: 5, text: 'أول خلفاء الراشدين هو الصحابي:', correct: 'أبو بكر الصديق', options: ['عمر بن الخطاب', 'أبو بكر الصديق', 'عثمان بن عفان', 'علي بن أبي طالب'] },
    { id: 6, text: 'الصحابي الملقب بـ "الفاروق" هو:', correct: 'عمر بن الخطاب', options: ['عمر بن الخطاب', 'خالد بن الوليد', 'أبو عبيدة بن الجراح', 'سعد بن أبي وقاص'] },
    { id: 7, text: 'الصحابي الملقب بـ "ذو النورين" هو:', correct: 'عثمان بن عفان', options: ['علي بن أبي طالب', 'عثمان بن عفان', 'طلحة بن عبيد الله', 'الزبير بن العوام'] },
    { id: 8, text: 'الصحابي الذي يلقب بـ "سيف الله المسلول" هو:', correct: 'خالد بن الوليد', options: ['حمزة بن عبد المطلب', 'سعد بن معاذ', 'خالد بن الوليد', 'علي بن أبي طالب'] },
    { id: 9, text: 'أول مؤذن في الإسلام هو الصحابي:', correct: 'بلال بن رباح', options: ['بلال بن رباح', 'عبد الله بن أم مكتوم', 'أسامة بن زيد', 'صهيب الرومي'] },
    { id: 10, text: 'عاصمة المملكة العربية السعودية هي:', correct: 'الرياض', options: ['جدة', 'الرياض', 'الدمام', 'مكة المكرمة'] },
    { id: 11, text: 'أكبر كوكب في المجموعة الشمسية هو:', correct: 'المشتري', options: ['المشتري', 'زحل', 'الأرض', 'المريخ'] },
    { id: 12, text: 'ما هو أطول نهر في العالم؟', correct: 'النيل', options: ['الأمازون', 'النيل', 'الميسيسيبي', 'يانغتسي'] },
    { id: 13, text: 'عاصمة جمهورية مصر العربية هي:', correct: 'القاهرة', options: ['الإسكندرية', 'الجيزة', 'القاهرة', 'أسوان'] },
    { id: 14, text: 'كم عدد أركان الإسلام؟', correct: '5', options: ['5', '6', '4', '7'] },
    { id: 15, text: 'كم عدد أركان الإيمان؟', correct: '6', options: ['5', '6', '7', '4'] },
    { id: 16, text: 'السورة التي لا تبدأ بالبسملة هي:', correct: 'التوبة', options: ['التوبة', 'الأنفال', 'يونس', 'هود'] },
    { id: 17, text: 'أول سفير في الإسلام هو الصحابي:', correct: 'مصعب بن عمير', options: ['معاذ بن جبل', 'مصعب بن عمير', 'زيد بن حارثة', 'أسامة بن زيد'] },
    { id: 18, text: 'خادم الرسول صلى الله عليه وسلم هو الصحابي:', correct: 'أنس بن مالك', options: ['أنس بن مالك', 'عبد الله بن مسعود', 'زيد بن ثابت', 'جابر بن عبد الله'] },
    { id: 19, text: 'ما هو أسرع حيوان بري في العالم؟', correct: 'الفهد', options: ['الأسد', 'الغزال', 'الفهد', 'الحصان'] },
    { id: 20, text: 'أكبر قارة في العالم من حيث المساحة هي:', correct: 'آسيا', options: ['أفريقيا', 'آسيا', 'أمريكا الشمالية', 'أوروبا'] },
    { id: 21, text: 'العنصر الأهم لتنفس الإنسان هو:', correct: 'الأكسجين', options: ['النيتروجين', 'الأكسجين', 'الهيدروجين', 'ثاني أكسيد الكربون'] },
    { id: 22, text: 'ما هي القبلة الأولى للمسلمين؟', correct: 'المسجد الأقصى', options: ['المسجد الحرام', 'المسجد الأقصى', 'المسجد النبوي', 'مسجد قباء'] },
    { id: 23, text: 'أول مسجد بُني في الإسلام هو:', correct: 'مسجد قباء', options: ['مسجد قباء', 'المسجد النبوي', 'المسجد الحرام', 'مسجد القبلتين'] },
    { id: 24, text: 'الصحابي الملقب بـ "أسد الله" هو:', correct: 'حمزة بن عبد المطلب', options: ['علي بن أبي طالب', 'حمزة بن عبد المطلب', 'خالد بن الوليد', 'سعد بن أبي وقاص'] },
    { id: 25, text: 'من هي أول امرأة آمنت بالرسول صلى الله عليه وسلم؟', correct: 'خديجة بنت خويلد', options: ['عائشة بنت أبي بكر', 'خديجة بنت خويلد', 'فاطمة الزهراء', 'أم سلمة'] },
    { id: 26, text: 'ما هي الدولة التي تُلقب بـ "بلد المليون ونصف المليون شهيد"؟', correct: 'الجزائر', options: ['فلسطين', 'الجزائر', 'السودان', 'مصر'] },
    { id: 27, text: 'عاصمة فرنسا هي مدينة:', correct: 'باريس', options: ['باريس', 'مارسيليا', 'ليون', 'نيس'] },
    { id: 28, text: 'أين تقع أهرامات الجيزة؟', correct: 'مصر', options: ['السودان', 'مصر', 'المكسيك', 'العراق'] },
    { id: 29, text: 'النبي الذي بلعه الحوت هو:', correct: 'يونس عليه السلام', options: ['يونس عليه السلام', 'يوسف عليه السلام', 'موسى عليه السلام', 'إبراهيم عليه السلام'] },
    { id: 30, text: 'النبي الذي بنى الكعبة مع ابنه إسماعيل هو:', correct: 'إبراهيم عليه السلام', options: ['نوح عليه السلام', 'إبراهيم عليه السلام', 'آدم عليه السلام', 'سليمان عليه السلام'] },
    { id: 31, text: 'النبي الذي كَلَّمَه الله تعالى مباشرة هو:', correct: 'موسى عليه السلام', options: ['عيسى عليه السلام', 'موسى عليه السلام', 'صالح عليه السلام', 'شعيب عليه السلام'] },
    { id: 32, text: 'كم عدد السجدات في القرآن الكريم؟', correct: '15 سجدة', options: ['15 سجدة', '10 سجدات', '12 سجدة', '20 سجدة'] },
    { id: 33, text: 'سورة في القرآن تحتوي على بسملتين هي:', correct: 'النمل', options: ['النور', 'النمل', 'النحل', 'النجم'] },
    { id: 34, text: 'الصحابي الملقب بـ "ترجمان القرآن" هو:', correct: 'عبد الله بن عباس', options: ['عبد الله بن مسعود', 'عبد الله بن عباس', 'أبي بن كعب', 'زيد بن ثابت'] },
    { id: 35, text: 'شاعر الرسول صلى الله عليه وسلم هو الصحابي:', correct: 'حسان بن ثابت', options: ['حسان بن ثابت', 'كعب بن زهير', 'عبد الله بن رواحة', 'النابغة الذبياني'] },
    { id: 36, text: 'زوجة النبي الملقبة بـ "أم المساكين" هي:', correct: 'زينب بنت خزيمة', options: ['زينب بنت خزيمة', 'خديجة بنت خويلد', 'عائشة بنت أبي بكر', 'حفصة بنت عمر'] },
    { id: 37, text: 'أول طفل آمن بالرسول صلى الله عليه وسلم هو:', correct: 'علي بن أبي طالب', options: ['أسامة بن زيد', 'علي بن أبي طالب', 'عبد الله بن عمر', 'الحسين بن علي'] },
    { id: 38, text: 'كم عدد أحرف اللغة العربية؟', correct: '28 حرفاً', options: ['28 حرفاً', '26 حرفاً', '30 حرفاً', '29 حرفاً'] },
    { id: 39, text: 'أسرع الطيور في العالم هو:', correct: 'الصقر', options: ['النسر', 'الصقر', 'النعامة', 'الحمامة'] },
    { id: 40, text: 'أطول كائن حي في البحر هو:', correct: 'الحوت الأزرق', options: ['الحوت الأزرق', 'القرش الأبيض', 'قنديل البحر العملاق', 'الأخطبوط'] },
    { id: 41, text: 'أكبر دولة في العالم من حيث المساحة هي:', correct: 'روسيا', options: ['أمريكا', 'روسيا', 'كندا', 'الصين'] },
    { id: 42, text: 'الصحابي الذي اهتز لوفاته عرش الرحمن هو:', correct: 'سعد بن معاذ', options: ['سعد بن معاذ', 'مصعب بن عمير', 'جابر بن عبد الله', 'حمزة بن عبد المطلب'] },
    { id: 43, text: 'أم المؤمنين الملقبة بـ "الحميراء" هي:', correct: 'عائشة بنت أبي بكر', options: ['عائشة بنت أبي بكر', 'حفصة بنت عمر', 'أم سلمة', 'سودة بنت زمعة'] },
    { id: 44, text: 'العاصمة الاقتصادية للمملكة المغربية هي:', correct: 'الدار البيضاء', options: ['الرباط', 'الدار البيضاء', 'مراكش', 'طنجة'] },
    { id: 45, text: 'أقرب كوكب إلى الشمس هو:', correct: 'عطارد', options: ['عطارد', 'الزهرة', 'المريخ', 'نبتون'] },
    { id: 46, text: 'السورة التي تُسمى "عروس القرآن" هي:', correct: 'الرحمن', options: ['يس', 'الرحمن', 'الملك', 'الواقعة'] },
    { id: 47, text: 'ما هو الحيوان الملقب بـ "ملك الغابة"؟', correct: 'الأسد', options: ['النمر', 'الأسد', 'الفهد', 'الضبع'] },
    { id: 48, text: 'أكبر دولة عربية من حيث المساحة هي:', correct: 'الجزائر', options: ['السعودية', 'الجزائر', 'السودان', 'مصر'] },
    { id: 49, text: 'الغاز الأكثر وجوداً في الغلاف الجوي للأرض هو:', correct: 'النيتروجين', options: ['الأكسجين', 'النيتروجين', 'الهيدروجين', 'ثاني أكسيد الكربون'] },
    { id: 50, text: 'كم عدد الغزوات التي شارك فيها النبي صلى الله عليه وسلم بنفسه؟', correct: '27 غزوة', options: ['27 غزوة', '19 غزوة', '30 غزوة', '15 غزوة'] }
  ],
  medium: [
    { id: 51, text: 'كم عدد أجزاء القرآن الكريم؟', correct: '30 جزءاً', options: ['60 جزءاً', '30 جزءاً', '114 جزءاً', '40 جزءاً'] },
    { id: 52, text: 'الصحابي الملقب بـ "أمين هذه الأمة" هو:', correct: 'أبو عبيدة بن الجراح', options: ['أبو عبيدة بن الجراح', 'حذيفة بن اليمان', 'سعد بن أبي وقاص', 'أبو هريرة'] },
    { id: 53, text: 'الصحابي الذي كانت تستحي منه الملائكة هو:', correct: 'عثمان بن عفان', options: ['أبو بكر الصديق', 'عمر بن الخطاب', 'عثمان بن عفان', 'علي بن أبي طالب'] },
    { id: 54, text: 'ما هي الغزوة التي وقعت فيها حادثة الإفك؟', correct: 'بني المصطلق', options: ['بني المصطلق', 'أحد', 'الخندق', 'حنين'] },
    { id: 55, text: 'ما هي آخر غزوات النبي صلى الله عليه وسلم؟', correct: 'تبوك', options: ['حنين', 'تبوك', 'مؤتة', 'خيبر'] },
    { id: 56, text: 'الصحابي الملقب بـ "حبر الأمة" هو:', correct: 'عبد الله بن عباس', options: ['عبد الله بن مسعود', 'عبد الله بن عباس', 'عبد الله بن عمر', 'عبد الله بن عمرو'] },
    { id: 57, text: 'كم عدد سنوات الخلافة الراشدة؟', correct: '30 سنة', options: ['30 سنة', '25 سنة', '40 سنة', '20 سنة'] },
    { id: 58, text: 'الدولة الأكثر إنتاجاً للقهوة في العالم هي:', correct: 'البرازيل', options: ['كولومبيا', 'البرازيل', 'إثيوبيا', 'فيتنام'] },
    { id: 59, text: 'أكبر بحر مغلق في العالم هو:', correct: 'بحر قزوين', options: ['بحر قزوين', 'البحر الميت', 'البحر الأسود', 'البحر الأحمر'] },
    { id: 60, text: 'تقع مقبرة البقيع التاريخية في مدينة:', correct: 'المدينة المنورة', options: ['مكة المكرمة', 'المدينة المنورة', 'القدس', 'الطائف'] },
    { id: 61, text: 'السورة التي تشفع لصاحبها وتنجيه من عذاب القبر هي:', correct: 'الملك', options: ['يس', 'الملك', 'الواقعة', 'الكهف'] },
    { id: 62, text: 'الحيوان الذي لا يشرب الماء طوال حياته هو:', correct: 'الفأر الكنغري', options: ['الجمل', 'الفأر الكنغري', 'الضب', 'الكوالا'] },
    { id: 63, text: 'أصغر دولة في العالم من حيث المساحة هي:', correct: 'الفاتيكان', options: ['موناكو', 'الفاتيكان', 'المالديف', 'سان مارينو'] },
    { id: 64, text: 'كم عدد القراءات العشر المتواترة للقرآن الكريم؟', correct: '10 قراءات', options: ['10 قراءات', '7 قراءات', '14 قراءة', '12 قراءة'] },
    { id: 65, text: 'العنصر الكيميائي الذي رمزه (Fe) هو:', correct: 'الحديد', options: ['الفضة', 'الحديد', 'الفوسفور', 'الفلور'] },
    { id: 66, text: 'الصحابي الذي رافق النبي صلى الله عليه وسلم في الهجرة هو:', correct: 'أبو بكر الصديق', options: ['عمر بن الخطاب', 'أبو بكر الصديق', 'علي بن أبي طالب', 'معاذ بن جبل'] },
    { id: 67, text: 'الصحابي الذي أشار على النبي بحفر الخندق هو:', correct: 'سلمان الفارسي', options: ['سلمان الفارسي', 'عمار بن ياسر', 'حذيفة بن اليمان', 'أبو ذر الغفاري'] },
    { id: 68, text: 'العضو الأكبر في جسم الإنسان هو:', correct: 'الجلد', options: ['الكبد', 'الجلد', 'الأمعاء', 'الرئة'] },
    { id: 69, text: 'كم عدد تكبيرات صلاة الجنازة؟', correct: '4 تكبيرات', options: ['3 تكبيرات', '4 تكبيرات', '5 تكبيرات', '2 تكبيرتان'] },
    { id: 70, text: 'السورة التي تُسمى أيضاً "سورة بني إسرائيل" هي:', correct: 'الإسراء', options: ['الإسراء', 'النمل', 'القصص', 'الكهف'] },
    { id: 71, text: 'قائد المسلمين في معركة القادسية هو:', correct: 'سعد بن أبي وقاص', options: ['خالد بن الوليد', 'سعد بن أبي وقاص', 'عمرو بن العاص', 'أبو عبيدة بن الجراح'] },
    { id: 72, text: 'قائد المسلمين في فتح مصر هو الصحابي:', correct: 'عمرو بن العاص', options: ['عمرو بن العاص', 'خالد بن الوليد', 'شرحبيل بن حسنة', 'عقبة بن نافع'] },
    { id: 73, text: 'السورة التي تُقرأ للحماية من فتنة المسيح الدجال هي:', correct: 'الكهف', options: ['يس', 'الكهف', 'الدخان', 'الواقعة'] },
    { id: 74, text: 'كم عدد أجنحة جبريل عليه السلام كما ورد في الحديث الصحيح؟', correct: '600 جناح', options: ['100 جناح', '600 جناح', '500 جناح', '1000 جناح'] },
    { id: 75, text: 'عاصمة إسبانيا هي مدينة:', correct: 'مدريد', options: ['مدريد', 'برشلونة', 'إشبيلية', 'غرناطة'] },
    { id: 76, text: 'النهر الذي يمر بأكبر عدد من الدول في العالم هو:', correct: 'الدانوب', options: ['النيل', 'الدانوب', 'الراين', 'الأمازون'] },
    { id: 77, text: 'مخترع المصباح الكهربائي هو:', correct: 'توماس إديسون', options: ['نيكولا تسلا', 'توماس إديسون', 'غراهام بيل', 'آينشتاين'] },
    { id: 78, text: 'مكتشف البنسلين هو العالم:', correct: 'ألكسندر فليمنغ', options: ['لويس باسطور', 'ألكسندر فليمنغ', 'روبرت كوخ', 'إدوارد جينر'] },
    { id: 79, text: 'أطول سلسلة جبال في العالم هي:', correct: 'جبال الأنديز', options: ['جبال الهيمالايا', 'جبال الأنديز', 'جبال الألب', 'جبال أطلس'] },
    { id: 80, text: 'الصحابي الملقب بـ "صاحب سر الرسول" هو:', correct: 'حذيفة بن اليمان', options: ['حذيفة بن اليمان', 'زيد بن ثابت', 'أسامة بن زيد', 'عبد الله بن مسعود'] },
    { id: 81, text: 'الصحابي الذي كانت الملائكة تسلم عليه هو:', correct: 'عمران بن حصين', options: ['خبيب بن عدي', 'عمران بن حصين', 'أبي بن كعب', 'ثابت بن قيس'] },
    { id: 82, text: 'الصحابي الملقب بـ "طيار الجنة" أو "ذو الجناحين" هو:', correct: 'جعفر بن أبي طالب', options: ['حمزة بن عبد المطلب', 'جعفر بن أبي طالب', 'زيد بن حارثة', 'عبد الله بن رواحة'] },
    { id: 83, text: 'السورة التي نزلت دفعة واحدة وحفها سبعون ألف ملك هي:', correct: 'الأنعام', options: ['الأنعام', 'الأعراف', 'يونس', 'التوبة'] },
    { id: 84, text: 'كم عدد سور القرآن المدنية؟', correct: '28 سورة', options: ['86 سورة', '28 سورة', '30 سورة', '20 سورة'] },
    { id: 85, text: 'عاصمة أستراليا هي مدينة:', correct: 'كانبرا', options: ['سيدني', 'كانبرا', 'ملبورن', 'بريزبان'] },
    { id: 86, text: 'القارة التي لا تحتوي على أي صحراء هي:', correct: 'أوروبا', options: ['أمريكا الشمالية', 'أوروبا', 'أستراليا', 'القطبية الجنوبية'] },
    { id: 87, text: 'المعدن الوحيد الذي يوجد في حالة سائلة عند درجة حرارة الغرفة هو:', correct: 'الزئبق', options: ['البروم', 'الزئبق', 'النحاس', 'الرصاص'] },
    { id: 88, text: 'كم يبلغ معدل خفقات قلب الإنسان البالغ الطبيعي في الدقيقة في وقت الراحة؟', correct: '60-100', options: ['30-50', '60-100', '120-150', '160-200'] },
    { id: 89, text: 'عاصمة كندا هي مدينة:', correct: 'أوتاوا', options: ['تورونتو', 'أوتاوا', 'مونتريال', 'فانكوفر'] },
    { id: 90, text: 'الصحابي الذي غسلته الملائكة هو:', correct: 'حنظلة بن أبي عامر', options: ['حنظلة بن أبي عامر', 'مصعب بن عمير', 'حمزة بن عبد المطلب', 'سعد بن معاذ'] },
    { id: 91, text: 'المراة التي جادلت النبي في زوجها ونزل فيها القرآن في سورة المجادلة هي:', correct: 'خولة بنت ثعلبة', options: ['الخنساء', 'خولة بنت ثعلبة', 'نسيبة بنت كعب', 'أسماء بنت أبي بكر'] },
    { id: 92, text: 'معجم "القاموس المحيط" الشهير هو من تأليف العالم:', correct: 'الفيروزآبادي', options: ['الفيروزآبادي', 'ابن منظور', 'الجوهري', 'الزمخشري'] },
    { id: 93, text: 'العلم الذي يختص بدراسة أحافير الكائنات الحية القديمة يُسمى:', correct: 'علم الأحافير', options: ['علم الجيولوجيا', 'علم الأحافير', 'علم الأرصاد', 'علم الأنثروبولوجيا'] },
    { id: 94, text: 'أكبر جزيرة في العالم هي:', correct: 'جرينلاند', options: ['مدغشقر', 'جرينلاند', 'بورنيو', 'غينيا الجديدة'] },
    { id: 95, text: 'كم عدد لاعبي فريق كرة القدم داخل الملعب أثناء المباراة؟', correct: '11 لاعباً', options: ['10 لاعبين', '11 لاعباً', '12 لاعباً', '9 لاعبين'] },
    { id: 96, text: 'أين وقعت معركة حطين الشهيرة؟', correct: 'فلسطين', options: ['سوريا', 'فلسطين', 'مصر', 'الأردن'] },
    { id: 97, text: 'القائد الذي انتصر على الصليبيين في معركة حطين هو:', correct: 'صلاح الدين الأيوبي', options: ['قطز', 'صلاح الدين الأيوبي', 'بيبرس', 'نور الدين زنكي'] },
    { id: 98, text: 'السورة التي تُسمى "الفاضحة" هي سورة:', correct: 'التوبة', options: ['المنافقون', 'التوبة', 'الأحزاب', 'الحشر'] },
    { id: 99, text: 'أقدم جامعة مستمرة بالعمل حتى اليوم في العالم هي:', correct: 'جامعة القرويين', options: ['جامعة الأزهر', 'جامعة القرويين', 'جامعة بولونيا', 'جامعة أكسفورد'] },
    { id: 100, text: 'المادة الأساسية التي تُصنع منها الألياف الزجاجية هي:', correct: 'الرمل', options: ['البلاستيك', 'الرمل', 'الكلس', 'الجبس'] }
  ],
  hard: [
    { id: 101, text: 'الصحابي الذي كان يُلقب بـ "ذو الشهادتين" وتُعادل شهادته شهادة رجلين هو:', correct: 'خزيمة بن ثابت', options: ['خزيمة بن ثابت', 'ثابت بن قيس', 'النعمان بن مقرن', 'قتادة بن النعمان'] },
    { id: 102, text: 'ما هي الآية الأخيرة التي نزلت من القرآن الكريم على أرجح أقوال المفسرين؟', correct: 'واتقوا يوماً ترجعون فيه إلى الله', options: ['اليوم أكملت لكم دينكم', 'واتقوا يوماً ترجعون فيه إلى الله', 'إذا جاء نصر الله والفتح', 'قل هو الله أحد'] },
    { id: 103, text: 'الصحابي الذي دعا له النبي بالبركة في تجارته فكان لو اشترى التراب لربح فيه هو:', correct: 'عروة بن الجعد البارقي', options: ['عبد الرحمن بن عوف', 'عروة بن الجعد البارقي', 'عثمان بن عفان', 'طلحة بن عبيد الله'] },
    { id: 104, text: 'كم كان عمر النبي صلى الله عليه وسلم عندما توفيت أمه آمنة بنت وهب؟', correct: '6 سنوات', options: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات'] },
    { id: 105, text: 'السورة التي بدأت باسم ثمرتين هي سورة:', correct: 'التين', options: ['النحل', 'التين', 'الرمان', 'الزيتون'] },
    { id: 106, text: 'الصحابي الذي أمره النبي بتعلم لغة اليهود فتعلمها في 17 يوماً هو:', correct: 'زيد بن ثابت', options: ['معاذ بن جبل', 'زيد بن ثابت', 'كعب بن مالك', 'أسامة بن زيد'] },
    { id: 107, text: 'الصحابي الوحيد الذي ذُكر اسمه صراحة في القرآن الكريم هو:', correct: 'زيد بن حارثة', options: ['أبو بكر الصديق', 'زيد بن حارثة', 'سعد بن معاذ', 'بلال بن رباح'] },
    { id: 108, text: 'الدولة التي تحتوي على أكبر عدد من البراكين النشطة في العالم هي:', correct: 'إندونيسيا', options: ['اليابان', 'إندونيسيا', 'إيطاليا', 'آيسلندا'] },
    { id: 109, text: 'العنصر الكيميائي الأكثر وفرة في الكون هو:', correct: 'الهيدروجين', options: ['الهيليوم', 'الهيدروجين', 'الأكسجين', 'الكربون'] },
    { id: 110, text: 'أعمق نقطة في محيطات العالم هي:', correct: 'خندق ماريانا', options: ['خندق بورتوريكو', 'خندق ماريانا', 'خندق جافا', 'خندق تونغا'] },
    { id: 111, text: 'الدولة الوحيدة في العالم التي تقع بالكامل فوق ارتفاع 1000 متر عن سطح البحر هي:', correct: 'ليسوتو', options: ['نيبال', 'ليسوتو', 'بوتان', 'أندورا'] },
    { id: 112, text: 'كم عدد أسنان الإنسان البالغ الطبيعية بالكامل (مع ضروس العقل)؟', correct: '32 سنّاً', options: ['30 سنّاً', '32 سنّاً', '28 سنّاً', '36 سنّاً'] },
    { id: 113, text: 'الصحابي الملقب بـ "أبي تراب" هو:', correct: 'علي بن أبي طالب', options: ['أبو هريرة', 'علي بن أبي طالب', 'أبو ذر الغفاري', 'أبو الدرداء'] },
    { id: 114, text: 'السورة التي تُسمى "سورة الحواريين" هي سورة:', correct: 'الصف', options: ['الجمعة', 'الصف', 'المائدة', 'التغابن'] },
    { id: 115, text: 'الشاعر العربي الملقب بـ "رهين المحبسين" هو:', correct: 'أبو العلاء المعري', options: ['المتنبي', 'أبو العلاء المعري', 'أبو تمام', 'البحتري'] },
    { id: 116, text: 'خط الدفاع الفرنسي الشهير قبل الحرب العالمية الثانية يُعرف بخط:', correct: 'ماجينو', options: ['سيغفريد', 'ماجينو', 'بارليف', 'مانرهايم'] },
    { id: 117, text: 'السورة الوحيدة في القرآن الكريم التي تنتهي كل آياتها بحرف السين هي سورة:', correct: 'الناس', options: ['الفلق', 'الناس', 'الكافرون', 'المسد'] },
    { id: 118, text: 'الصحابي الذي قاد جيش المسلمين في بداية معركة مؤتة قبل استشهاده هو:', correct: 'زيد بن حارثة', options: ['جعفر بن أبي طالب', 'زيد بن حارثة', 'عبد الله بن رواحة', 'خالد بن الوليد'] },
    { id: 119, text: 'المعركة التاريخية التي سُميت بـ "فتح الفتوح" هي معركة:', correct: 'نهاوند', options: ['القادسية', 'نهاوند', 'اليرموك', 'عين جالوت'] },
    { id: 120, text: 'خطيب الرسول صلى الله عليه وسلم هو الصحابي:', correct: 'ثابت بن قيس', options: ['حسان بن ثابت', 'ثابت بن قيس', 'عبد الله بن رواحة', 'قيس بن الشماس'] },
    { id: 121, text: 'أصغر عظمة في جسم الإنسان هي:', correct: 'عظمة الركاب', options: ['عظمة المطرقة', 'عظمة الركاب', 'عظمة السندان', 'عظمة السلاميات'] },
    { id: 122, text: 'كم عدد المربعات على رقعة الشطرنج؟', correct: '64 مربعاً', options: ['32 مربعاً', '64 مربعاً', '81 مربعاً', '100 مربع'] },
    { id: 123, text: 'مؤسس علم الجبر هو العالم المسلم:', correct: 'الخوارزمي', options: ['ابن الهيثم', 'الخوارزمي', 'ابن سينا', 'جابر بن حيان'] },
    { id: 124, text: 'العالم الملقب بـ "أبو الكيمياء" عند العرب والمسلمين هو:', correct: 'جابر بن حيان', options: ['الرازي', 'جابر بن حيان', 'الكندي', 'البيروني'] },
    { id: 125, text: 'الكوكب الأكثر سخونة في المجموعة الشمسية هو:', correct: 'الزهرة', options: ['عطارد', 'الزهرة', 'المريخ', 'المشتري'] },
    { id: 126, text: 'أطول عظمة في جسم الإنسان هي:', correct: 'عظمة الفخذ', options: ['عظمة القص', 'عظمة الفخذ', 'عظمة الشظية', 'عظمة العضد'] },
    { id: 127, text: 'النبي الذي لبث في قومه يدعوهم ألف سنة إلا خمسين عاماً هو:', correct: 'نوح عليه السلام', options: ['آدم عليه السلام', 'نوح عليه السلام', 'إبراهيم عليه السلام', 'شيث عليه السلام'] },
    { id: 128, text: 'الصحابي الملقب بـ "تاجر الرحمن" لكثرة صدقاته هو:', correct: 'عبد الرحمن بن عوف', options: ['عثمان بن عفان', 'عبد الرحمن بن عوف', 'أبو بكر الصديق', 'الزبير بن العوام'] },
    { id: 129, text: 'الدولة العربية الوحيدة التي يمر بها خط الاستواء هي:', correct: 'الصومال', options: ['السودان', 'الصومال', 'جيبوتي', 'جزر القمر'] },
    { id: 130, text: 'أطول نهر في قارة أوروبا هو:', correct: 'نهر الفولغا', options: ['نهر الدانوب', 'نهر الفولغا', 'نهر الراين', 'نهر الدنيبر'] },
    { id: 131, text: 'الغزوة التي أُسرت فيها الشيماء أخت النبي صلى الله عليه وسلم من الرضاع هي:', correct: 'حنين', options: ['بدر', 'حنين', 'خيبر', 'الطائف'] },
    { id: 132, text: 'الملك الذي بنى حدائق بابل المعلقة هو:', correct: 'نبوخذ نصر الثاني', options: ['حمورابي', 'نبوخذ نصر الثاني', 'سرجون الأكدي', 'آشور بنيبال'] },
    { id: 133, text: 'السورة التي تُسمى "سورة القتال" هي سورة:', correct: 'محمد', options: ['الأنفال', 'محمد', 'الفتح', 'الأحزاب'] },
    { id: 134, text: 'السورة التي تُسمى "سورة بني النضير" هي سورة:', correct: 'الحشر', options: ['المنافقون', 'الحشر', 'الممتحنة', 'التحريم'] },
    { id: 135, text: 'العالم المسلم الملقب بـ "شيخ الأطباء" وألف كتاب "القانون في الطب" هو:', correct: 'ابن سينا', options: ['الرازي', 'ابن سينا', 'ابن النفيس', 'الزهراوي'] },
    { id: 136, text: 'اكتشف الدورة الدموية الصغرى العالم المسلم:', correct: 'ابن النفيس', options: ['ابن الهيثم', 'ابن النفيس', 'هارفي', 'ابن رشد'] },
    { id: 137, text: 'الدولة التي تحتوي على أكبر عدد من الأهرامات في العالم هي:', correct: 'السودان', options: ['مصر', 'السودان', 'المكسيك', 'بيرو'] },
    { id: 138, text: 'أقرب نجم إلى الكرة الأرضية بعد الشمس هو:', correct: 'قنطورس القريب', options: ['الشعرى اليمانية', 'قنطورس القريب', 'النجم القطبي', 'النسر الواقع'] },
    { id: 139, text: 'أكبر بحيرة عذبة في العالم من حيث المساحة هي:', correct: 'بحيرة سوبريور', options: ['بحيرة بايكال', 'بحيرة سوبريور', 'بحيرة فيكتوريا', 'بحيرة ميشيغان'] },
    { id: 140, text: 'أكبر بحيرة عذبة في العالم من حيث حجم المياه هي:', correct: 'بحيرة بايكال', options: ['بحيرة سوبريور', 'بحيرة بايكال', 'بحيرة تنجانيقا', 'بحيرة فيكتوريا'] },
    { id: 141, text: 'كم عدد القلوب لدى الأخطبوط؟', correct: '3 قلوب', options: ['قلب واحد', '3 قلوب', 'قلبان', '4 قلوب'] },
    { id: 142, text: 'الغاز الذي يمتصه النبات للقيام بعملية البناء الضوئي هو:', correct: 'ثاني أكسيد الكربون', options: ['الأكسجين', 'ثاني أكسيد الكربون', 'الهيدروجين', 'النيتروجين'] },
    { id: 143, text: 'الصحابي الذي أشار على أبي بكر الصديق بجمع القرآن الكريم هو:', correct: 'عمر بن الخطاب', options: ['عثمان بن عفان', 'عمر بن الخطاب', 'علي بن أبي طالب', 'زيد بن ثابت'] },
    { id: 144, text: 'اسم سيف علي بن أبي طالب الشهير هو:', correct: 'ذو الفقار', options: ['البتار', 'ذو الفقار', 'العضب', 'المأثور'] },
    { id: 145, text: 'السورة التي تحتوي على أطول آية في القرآن الكريم (آية الدين) هي سورة:', correct: 'البقرة', options: ['آل عمران', 'البقرة', 'النساء', 'المائدة'] },
    { id: 146, text: 'الصحابي الذي لم يسجد لصنم قط قبل الإسلام ولُقّب بـ "كرّم الله وجهه" هو:', correct: 'علي بن أبي طالب', options: ['أبو بكر الصديق', 'علي بن أبي طالب', 'عثمان بن عفان', 'الزبير بن العوام'] },
    { id: 147, text: 'السورة التي تكررت فيها الآية "فبأي آلاء ربكما تكذبان" 31 مرة هي:', correct: 'الرحمن', options: ['يس', 'الرحمن', 'الملك', 'الواقعة'] },
    { id: 148, text: 'ما هو أسرع كوكب يدور حول الشمس في مجرتنا؟', correct: 'عطارد', options: ['الزهرة', 'عطارد', 'المريخ', 'زحل'] },
    { id: 149, text: 'من هما الصحابيان اللذان أطلق عليهما النبي لقب "ريحانتاي من الدنيا"؟', correct: 'الحسن والحسين', options: ['الحسن والحسين', 'عبد الله بن عمر وعبد الله بن عباس', 'طلحة والزبير', 'أسامة بن زيد وزيد بن حارثة'] },
    { id: 150, text: 'من هو العالم الذي لقّبه الأوروبيون بـ "Geber" ويُعد واضع أصول علم الكيمياء؟', correct: 'جابر بن حيان', options: ['الرازي', 'جابر بن حيان', 'ابن الهيثم', 'البيروني'] }
  ]
};

const levelPoints = { easy: 1, medium: 2, hard: 3 };
const levelMeta = {
  easy: { number: 1, label: 'سهل', color: '#3ddc97', bg: 'rgba(61, 220, 151, 0.12)', border: 'rgba(61, 220, 151, 0.8)' },
  medium: { number: 2, label: 'متوسط', color: '#f7b955', bg: 'rgba(247, 185, 85, 0.12)', border: 'rgba(247, 185, 85, 0.8)' },
  hard: { number: 3, label: 'صعب', color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.12)', border: 'rgba(255, 107, 107, 0.8)' }
};

function buildQuestionPool() {
  const pool = [];

  Object.entries(questionBank).forEach(([level, questions]) => {
    questions.forEach((question) => {
      pool.push({
        ...question,
        level,
        points: levelPoints[level] || 3,
        text: question.text,
        correct: question.correct,
        options: [...question.options]
      });
    });
  });

  return shuffleArray(pool);
}

function buildRoundDeck() {
  const pool = buildQuestionPool();
  const prizeValues = shuffleArray([3, 3, 5, 5, 10]);
  const prizeIndexes = new Set();
  const penaltyIndexes = new Set();
  const stealIndexes = new Set();

  while (prizeIndexes.size < 5) {
    prizeIndexes.add(Math.floor(Math.random() * 50));
  }

  while (penaltyIndexes.size < 3) {
    const target = Math.floor(Math.random() * 50);
    if (!prizeIndexes.has(target) && !stealIndexes.has(target)) {
      penaltyIndexes.add(target);
    }
  }

  while (stealIndexes.size < 3) {
    const target = Math.floor(Math.random() * 50);
    if (!prizeIndexes.has(target) && !penaltyIndexes.has(target)) {
      stealIndexes.add(target);
    }
  }

  const cards = [];

  for (let index = 0; index < 50; index += 1) {
    if (prizeIndexes.has(index)) {
      const value = prizeValues[cards.filter(card => card.kind === 'prize').length];
      cards.push({
        id: index + 1,
        number: index + 1,
        kind: 'prize',
        points: value,
        used: false,
        colorPair: boardPalette[index % boardPalette.length]
      });
      continue;
    }

    if (penaltyIndexes.has(index)) {
      cards.push({
        id: index + 1,
        number: index + 1,
        kind: 'penalty',
        points: 3,
        used: false,
        colorPair: boardPalette[index % boardPalette.length]
      });
      continue;
    }

    if (stealIndexes.has(index)) {
      cards.push({
        id: index + 1,
        number: index + 1,
        kind: 'steal',
        points: 3,
        used: false,
        colorPair: boardPalette[index % boardPalette.length]
      });
      continue;
    }

    const question = pool.shift();
    cards.push({
      id: index + 1,
      number: index + 1,
      kind: 'question',
      question,
      used: false,
      colorPair: boardPalette[index % boardPalette.length]
    });
  }

  return cards;
}

const state = {
  teams: Array.isArray(settings.teams) && settings.teams.length
    ? settings.teams.map((team, index) => ({
        ...team,
        color: team.color || fixedTeamPalette[index % fixedTeamPalette.length],
        score: 0
      }))
    : fallbackTeams.map((team, index) => ({
        ...team,
        color: team.color || fixedTeamPalette[index % fixedTeamPalette.length],
        score: 0
      })),
  cards: [],
  activeCard: null,
  currentTeamIndex: 0,
  timerSeconds: Number(settings.timerDuration || 30),
  questionTimerId: null,
  finished: false,
  hasStarted: false,
  correctStreak: 0,
  bonusRoundAwarded: false,
  bonusRoundActive: false
};

const boardEl = document.getElementById('board');
const scoreboardEl = document.getElementById('scoreboard');
const questionModal = document.getElementById('questionModal');
const questionBox = document.getElementById('questionBox');
const optionsContainer = document.getElementById('optionsContainer');
const questionTimerEl = document.getElementById('questionTimer');
const currentTeamNameEl = document.getElementById('currentTeamName');
const winnerModal = document.getElementById('winnerModal');
const winnerNameEl = document.getElementById('winnerName');
const winnerMessageEl = document.getElementById('winnerMessage');
const alertBanner = document.getElementById('alertBanner');
const introModal = document.getElementById('introModal');
const rulesModal = document.getElementById('rulesModal');
const startGameBtn = document.getElementById('startGameBtn');
const rulesStartBtn = document.getElementById('rulesStartBtn');
const rewardModal = document.getElementById('rewardModal');
const rewardValueEl = document.getElementById('rewardValue');
const rewardMessageEl = document.getElementById('rewardMessage');
const claimRewardBtn = document.getElementById('claimRewardBtn');
const bonusRoundModal = document.getElementById('bonusRoundModal');
const bonusRoundTitle = document.getElementById('bonusRoundTitle');
const bonusRoundDescription = document.getElementById('bonusRoundDescription');
const bonusRoundTeams = document.getElementById('bonusRoundTeams');
const stealModal = document.getElementById('stealModal');
const stealTeamList = document.getElementById('stealTeamList');

const defaultBoardPalette = [
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C'],
  ['#182334', '#D5A84C']
];

const boardPalette = defaultBoardPalette;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playTone(frequency, duration, type = 'sine', volume = 0.04, endFrequency = null) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const audioCtx = new AudioCtx();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const startTime = audioCtx.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);
  }

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
  setTimeout(() => audioCtx.close(), duration * 1000 + 120);
}

function playSuccessSound() {
  playTone(620, 0.14, 'triangle', 0.05, 760);
  setTimeout(() => playTone(820, 0.18, 'triangle', 0.06, 980), 80);
  setTimeout(() => playTone(980, 0.22, 'triangle', 0.05, 1100), 170);
}

function playFailSound() {
  playTone(240, 0.18, 'sawtooth', 0.05, 160);
  setTimeout(() => playTone(180, 0.24, 'square', 0.04, 120), 90);
}

function showAlert(message, type = 'info') {
  alertBanner.textContent = message;
  alertBanner.className = `alert-banner show ${type}`;
  alertBanner.setAttribute('data-type', type);
  clearTimeout(showAlert.timeoutId);
  const duration = type === 'fail' ? 2600 : type === 'success' ? 2000 : 1600;
  showAlert.timeoutId = setTimeout(() => {
    alertBanner.classList.remove('show');
  }, duration);
}

function showRewardPopup(amount, message) {
  rewardValueEl.textContent = `+${amount}`;
  rewardMessageEl.textContent = message;
  rewardModal.classList.remove('hidden');
}

function updateTurnIndicator() {
  const currentTeam = state.teams[state.currentTeamIndex] || state.teams[0];
  currentTeamNameEl.textContent = currentTeam?.name || 'الفريق 1';
}

function renderScoreboard() {
  updateTurnIndicator();
  scoreboardEl.innerHTML = state.teams.map((team, index) => `
    <div class="team-score ${index === state.currentTeamIndex ? 'active' : ''}">
      <div class="team-meta">
        <span class="color-dot" style="background:${team.color};"></span>
        <span class="team-name">${team.name}</span>
      </div>
      <span class="team-points">${team.score}</span>
    </div>
  `).join('');
}

const bonusPrizeIdeas = [
  'أول فريق يجلب ورقة يربح 5 نقاط.',
  'أول فريق يجلب جوال يربح 5 نقاط.',
  'أول فريق يجلب سجادة يربح 5 نقاط.',
  'أول فريق يقدم قلمًا للمعلم يربح 5 نقاط.',
  'أول فريق يقدّم شريحة جوال يربح 5 نقاط.',
  'أول فريق يسلم الأستاذ مصحفًا يربح 5 نقاط.',
  'أول فريق يعطي 5 ريالات يربح 5 نقاط.'
];

function getRandomBonusIdea() {
  return bonusPrizeIdeas[Math.floor(Math.random() * bonusPrizeIdeas.length)];
}

function getCompletedQuestionCount() {
  return state.cards.filter(card => card.kind === 'question' && card.used).length;
}

function maybeTriggerBonusRound() {
  if (state.finished || state.bonusRoundAwarded || state.bonusRoundActive) return;
  if (getCompletedQuestionCount() < 10) return;

  state.bonusRoundActive = true;
  const prizeText = getRandomBonusIdea();
  bonusRoundTitle.textContent = 'مكافأة الجولة';
  bonusRoundDescription.textContent = prizeText;

  bonusRoundTeams.innerHTML = state.teams.map((team, index) => `
    <button class="team-bonus-btn" type="button" data-team-index="${index}">
      ${team.name}
    </button>
  `).join('');

  bonusRoundTeams.querySelectorAll('.team-bonus-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const teamIndex = Number(button.dataset.teamIndex);
      const winningTeam = state.teams[teamIndex];
      if (!winningTeam) return;

      winningTeam.score += 5;
      state.bonusRoundAwarded = true;
      state.bonusRoundActive = false;
      bonusRoundModal.classList.add('hidden');
      renderScoreboard();
      showFloatScore(5);
      showAlert(`الفريق ${winningTeam.name} حصل على 5 نقاط إضافية`, 'success');
      playSuccessSound();
      saveGameState();
    });
  });

  bonusRoundModal.classList.remove('hidden');
  showAlert('تم الوصول إلى 10 مربعات — اختر الفائز في المكافأة', 'success');
}

function getCardValue(card) {
  return Number(card?.question?.points) || 10;
}

function buildBoard() {
  state.cards = buildRoundDeck();
  boardEl.innerHTML = state.cards.map((card) => {
    const [from, to] = card.colorPair;

    let cellClass = 'question-cell';

    if (card.kind === 'prize') {
      cellClass = 'prize-cell';
    } else if (card.kind === 'penalty') {
      cellClass = 'penalty-cell';
    } else if (card.kind === 'steal') {
      cellClass = 'steal-cell';
    }

    return `
      <button class="cell ${cellClass} ${card.used ? 'used' : ''}" data-id="${card.id}" style="background:linear-gradient(135deg, ${from}, ${to});" type="button">
        <span class="cell-number">${card.number}</span>
      </button>
    `;
  }).join('');

  boardEl.querySelectorAll('.cell').forEach(cellBtn => {
    cellBtn.addEventListener('click', () => {
      const cardId = Number(cellBtn.dataset.id);
      const card = state.cards.find(item => item.id === cardId);
      if (!card || card.used || state.finished || !state.hasStarted) return;

      cellBtn.classList.add('pressed');
      setTimeout(() => cellBtn.classList.remove('pressed'), 220);

      if (card.kind === 'prize') {
        awardPrize(card, cellBtn);
        return;
      }

      if (card.kind === 'penalty') {
        applyPenalty(card, cellBtn);
        return;
      }

      if (card.kind === 'steal') {
        openStealPicker(card, cellBtn);
        return;
      }

      openQuestionModal(card);
    });
  });
}

function shuffleArray(items) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function awardPrize(card, cell) {
  const selectedTeam = state.teams[state.currentTeamIndex];
  const gained = Number(card.points || 0);

  selectedTeam.score += gained;
  card.used = true;
  cell.disabled = true;
  cell.classList.add('success-cell');
  cell.innerHTML = `<span class="cell-number">+${gained}</span>`;

  renderScoreboard();
  showFloatScore(gained);
  showRewardPopup(gained, `مبروك! كسبت ${gained} نقطة`);
  showAlert(`مبروك! كسبت ${gained} نقطة`, 'success');
  playSuccessSound();
  maybeTriggerBonusRound();
  saveGameState();
}

function applyPenalty(card, cell) {
  const currentTeam = state.teams[state.currentTeamIndex];
  currentTeam.score = Math.max(0, currentTeam.score - 3);
  card.used = true;
  cell.disabled = true;
  cell.classList.add('wrong-cell');
  cell.innerHTML = '<span class="cell-number">-3</span>';

  renderScoreboard();
  showFloatScore(-3);
  showAlert(`تم خصم 3 نقاط من ${currentTeam.name}`, 'fail');
  playFailSound();
  maybeTriggerBonusRound();
  saveGameState();
}

function openStealPicker(card, cell) {
  const availableTeams = state.teams.filter((_, index) => index !== state.currentTeamIndex);
  if (!availableTeams.length) {
    showAlert('لا يوجد فريق آخر للاسرق منه', 'fail');
    return;
  }

  stealTeamList.innerHTML = availableTeams.map((team, index) => `
    <button class="steal-team-btn" type="button" data-team-index="${state.teams.indexOf(team)}" style="border-color:${team.color}; color:${team.color};">
      ${team.name}
    </button>
  `).join('');

  stealTeamList.querySelectorAll('.steal-team-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetIndex = Number(button.dataset.teamIndex);
      const currentTeam = state.teams[state.currentTeamIndex];
      const targetTeam = state.teams[targetIndex];

      if (!targetTeam) return;

      const targetPenalty = Math.min(3, Math.max(0, targetTeam.score));
      currentTeam.score += targetPenalty;
      targetTeam.score = Math.max(0, targetTeam.score - targetPenalty);

      card.used = true;
      cell.disabled = true;
      cell.classList.add('success-cell');
      cell.innerHTML = '<span class="cell-number">+3</span>';

      renderScoreboard();
      showFloatScore(3);
      showAlert(`تم سرقة 3 نقاط من ${targetTeam.name}`, 'success');
      playSuccessSound();
      stealModal.classList.add('hidden');
      maybeTriggerBonusRound();
      saveGameState();
    });
  });

  stealModal.classList.remove('hidden');
}

function showScoreBurst(teamIndex, amount) {
  const target = scoreboardEl.querySelectorAll('.team-score')[teamIndex];
  if (!target) return;

  const burst = document.createElement('div');
  burst.className = 'score-burst';
  burst.textContent = `+${amount}`;
  target.appendChild(burst);
  setTimeout(() => burst.remove(), 850);
}

function showFloatScore(value) {
  const overlay = document.createElement('div');
  overlay.className = 'floating-score';
  overlay.textContent = `+${value}`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 1100);
}

function renderCellAnswerState(cell, isCorrect) {
  if (!cell) return;

  cell.disabled = true;
  cell.classList.remove('success-cell', 'wrong-cell');
  cell.classList.add(isCorrect ? 'success-cell' : 'wrong-cell');

  const statusText = isCorrect ? 'صح' : 'خطأ';
  const labelText = isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة';

  cell.innerHTML = `
    <span class="cell-result-pill ${isCorrect ? 'success' : 'error'}">${statusText}</span>
    <span class="cell-result-label">${labelText}</span>
  `;
}

function advanceTurn() {
  state.currentTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;
  renderScoreboard();
}

function startQuestionTimer() {
  clearInterval(state.questionTimerId);
  state.timerSeconds = Number(settings.timerDuration || 30);
  questionTimerEl.textContent = formatTime(state.timerSeconds);

  state.questionTimerId = setInterval(() => {
    if (state.finished) {
      clearInterval(state.questionTimerId);
      return;
    }

    state.timerSeconds -= 1;
    questionTimerEl.textContent = formatTime(Math.max(0, state.timerSeconds));

    if (state.timerSeconds <= 0) {
      clearInterval(state.questionTimerId);
      handleQuestionTimeout();
    }
  }, 1000);
}

function handleQuestionTimeout() {
  const card = state.activeCard;
  if (!card) return;

  const cell = boardEl.querySelector(`.cell[data-id="${card.id}"]`);
  if (cell) {
    renderCellAnswerState(cell, false);
  }

  optionsContainer.querySelectorAll('.option-btn').forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === card.question.correct) {
      button.classList.add('correct');
    }
  });

  state.correctStreak = 0;
  playFailSound();
  showAlert(`انتهى الوقت — الإجابة الصحيحة: ${card.question.correct}`, 'fail');
  card.used = true;
  maybeTriggerBonusRound();
  saveGameState();

  setTimeout(() => {
    questionModal.classList.add('hidden');
    advanceTurn();
    state.activeCard = null;
  }, 1200);
}

function processAnswer(card, chosenButton, chosenAnswer) {
  if (!card || !state.activeCard || state.finished) return;

  clearInterval(state.questionTimerId);
  const isCorrect = chosenAnswer === card.question.correct;
  const selectedTeam = state.teams[state.currentTeamIndex];

  optionsContainer.querySelectorAll('.option-btn').forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === card.question.correct) {
      button.classList.add('correct');
    }
    if (button === chosenButton && !isCorrect) {
      button.classList.add('wrong');
      button.textContent = `${chosenAnswer} ❌`;
    }
    if (button === chosenButton && isCorrect) {
      button.textContent = `${chosenAnswer} ✅`;
    }
  });

  const cell = boardEl.querySelector(`.cell[data-id="${card.id}"]`);
  if (cell) {
    renderCellAnswerState(cell, isCorrect);
  }

  if (isCorrect) {
    const gained = getCardValue(card);
    selectedTeam.score += gained;
    state.correctStreak += 1;

    if (state.correctStreak > 0 && state.correctStreak % 3 === 0) {
      const bonus = 15;
      selectedTeam.score += bonus;
      renderScoreboard();
      showFloatScore(bonus);
      showRewardPopup(bonus, `مكافأة المتابعة للفريق ${selectedTeam.name}`);
      showAlert(`مبروك! +${gained} نقطة + مكافأة ${bonus}`, 'success');
    } else {
      renderScoreboard();
      showFloatScore(gained);
      showScoreBurst(state.currentTeamIndex, gained);
      showAlert(`مبروك! +${gained} نقطة للفريق ${selectedTeam.name}`, 'success');
    }

    playSuccessSound();
  } else {
    state.correctStreak = 0;
    showAlert(`إجابة خاطئة — الإجابة الصحيحة: ${card.question.correct}`, 'fail');
    playFailSound();
  }

  card.used = true;
  maybeTriggerBonusRound();
  saveGameState();
  checkWinner();

  if (!state.finished) {
    setTimeout(() => {
      questionModal.classList.add('hidden');
      advanceTurn();
      state.activeCard = null;
    }, 1100);
  }
}

function openQuestionModal(card) {
  state.activeCard = card;
  const uniqueOptions = [...new Set([
    card.question.correct,
    ...(card.question.options || []).filter(option => option !== card.question.correct)
  ])];
  const answerOptions = shuffleArray(uniqueOptions).slice(0, 4);

  const level = card.question.level;
  const levelLabel = level === 'easy' ? 'سهل' : level === 'medium' ? 'متوسط' : 'صعب';
  const levelColor = level === 'easy' ? '#1dbf73' : level === 'medium' ? '#f7b955' : '#ff6b6b';

  questionBox.innerHTML = `
    <div class="question-head">
      <span class="question-badge">سؤال</span>
      <span class="question-points">${getCardValue(card)} نقطة</span>
      <span class="question-level"><span class="level-dot" style="background:${levelColor};"></span>${levelLabel}</span>
    </div>
    <div class="question-text">${card.question.text}</div>
  `;

  optionsContainer.innerHTML = answerOptions.map(option => `
    <button class="option-btn" type="button" data-answer="${option}">${option}</button>
  `).join('');

  questionModal.classList.remove('hidden');
  startQuestionTimer();

  optionsContainer.querySelectorAll('.option-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (button.disabled) return;
      processAnswer(card, button, button.dataset.answer);
    });
  });
}

function closeQuestionModal() {
  clearInterval(state.questionTimerId);
  questionModal.classList.add('hidden');
  state.activeCard = null;
}

function saveGameState() {
  localStorage.setItem('challengeGameState', JSON.stringify({
    teams: state.teams,
    cards: state.cards,
    currentTeamIndex: state.currentTeamIndex,
    timerSeconds: state.timerSeconds,
    finished: state.finished,
    bonusRoundAwarded: state.bonusRoundAwarded,
    bonusRoundActive: state.bonusRoundActive
  }));
}

function checkWinner() {
  const allUsed = state.cards.every(card => card.used);
  if (!allUsed || state.finished) return;
  state.finished = true;
  clearInterval(state.questionTimerId);

  const winner = [...state.teams].sort((a, b) => b.score - a.score)[0];
  winnerNameEl.textContent = winner.name;
  winnerMessageEl.textContent = `النقاط النهائية: ${winner.score}`;
  winnerModal.classList.remove('hidden');
  showAlert(`الفائز: ${winner.name}`, 'success');
  playSuccessSound();
  saveGameState();
}

function resetScores() {
  state.finished = false;
  state.currentTeamIndex = 0;
  state.correctStreak = 0;
  state.timerSeconds = Number(settings.timerDuration || 30);
  state.bonusRoundAwarded = false;
  state.bonusRoundActive = false;
  state.teams = (Array.isArray(settings.teams) && settings.teams.length ? settings.teams : fallbackTeams).map(team => ({ ...team, score: 0 }));
  state.cards = [];
  buildBoard();
  renderScoreboard();
  winnerModal.classList.add('hidden');
  if (bonusRoundModal) bonusRoundModal.classList.add('hidden');
  closeQuestionModal();
  saveGameState();
}

function startGame() {
  state.hasStarted = true;
  introModal.classList.add('hidden');
  if (rulesModal) rulesModal.classList.add('hidden');
  showAlert('لعبة تبدأ الآن', 'success');
  playSuccessSound();
}

if (startGameBtn) {
  startGameBtn.addEventListener('click', () => {
    if (rulesModal) {
      rulesModal.classList.remove('hidden');
      introModal.classList.add('hidden');
    } else {
      startGame();
    }
  });
}

if (rulesStartBtn) {
  rulesStartBtn.addEventListener('click', startGame);
}

const closeQuestionBtn = document.getElementById('closeQuestionModal');
const playAgainBtnEl = document.getElementById('playAgainBtn');

if (closeQuestionBtn) {
  closeQuestionBtn.addEventListener('click', closeQuestionModal);
}

if (playAgainBtnEl) {
  playAgainBtnEl.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
    resetScores();
    state.hasStarted = true;
    introModal.classList.add('hidden');
  });
}

if (claimRewardBtn) {
  claimRewardBtn.addEventListener('click', () => rewardModal.classList.add('hidden'));
}

if (bonusRoundModal) {
  bonusRoundModal.addEventListener('click', (event) => {
    if (event.target === bonusRoundModal) {
      state.bonusRoundActive = false;
      bonusRoundModal.classList.add('hidden');
    }
  });
}

renderScoreboard();
buildBoard();

