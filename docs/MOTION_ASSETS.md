# ما المطلوب تصميمه (After Effects → تصدير للموقع)

**لوحة الألوان المرجعية:** أسود حبر `#05030A`، بنفسجي `#3F1F7A` → `#7B45C8`، ذهبي `#DDB55A` → `#FBF3DF`.

**ملاحظة:** **التعبير الخاص به** = أكواد **After Effects Expressions** (لغة الجافاسكربت داخل AE). تُفعَّل بالضغط **Alt + نقر على ساعة Stopwatch** أمام الخاصية (Opacity، Position، Rotation، إلخ) ولصق الكود هناك. عدِّل الثوابت (مدة الإطارات، الإزاحات) لتناسب كومبوزك.

---

## 1 — كشف الشعار (Preloader) — تصميم سينمائي احترافي

**عنوان:** Nawa Logo Reveal — Cinematic Preloader

**صيغة الملف:**  
`public/assets/lottie/logo-reveal.json` *(Lottie / Bodymovin إن كانت متجهات نظيفة)*  
أو `public/assets/video/logo-reveal.webm` *(VP9 + Alpha — الخيار الأقوى بصريًا)*  
**الكومبوز:** 1920 × 1080 — 30 fps — مدة **≈ 4.5 ث**

---

### التسلسل الزمني كاملًا

```
0.00 – 0.40 ث   ←  شريط ضوء ذهبي رفيع يعبر الشاشة أفقيًا (السبق البصري)
0.35 – 1.00 ث   ←  رسم Trim Paths للشعار (خطوط Nawa تُرسم من الصفر)
0.85 – 1.30 ث   ←  fill ذهبي يملأ الشعار بعد الرسم (Gradient reveal)
1.20 – 1.50 ث   ←  كلمة PRODUCTION تظهر بتباعد حروف موسّع (tracking)
1.40 – 1.70 ث   ←  خط ذهبي رفيع تحت PRODUCTION يمتد من المركز
1.65 – 2.80 ث   ←  وقفة hold — الشعار ثابت كامل الوضوح
2.80 – 3.10 ث   ←  توهج ذهبي خفيف (inner glow pulse) ثم يخفت
3.10 – 3.70 ث   ←  اختفاء ناعم للكل مع Scale طفيف للأمام (zoom out خفيف)
3.60 – 4.00 ث   ←  الشاشة تتلاشى للأسود الكامل
```

---

### هيكل الطبقات في AE

```
[Precomp] NAWA_LOGO_REVEAL  1920×1080 / 30fps
│
├── Solid BLACK            ← خلفية (لا تُصدَّر إن كنت تريد Alpha)
├── LIGHT SWEEP            ← شريط ضوء أول — Blend: Screen
├── LOGO SHAPE — OUTLINE   ← الشعار كـ Shape Layer — Stroke فقط أولًا
├── LOGO SHAPE — FILL      ← نفس الشيب — Fill Gradient ذهبي، ظهوره مؤجَّل
├── SHIMMER OVERLAY        ← لمعة تمر على الشعار — Blend: Add / Screen
├── TEXT "NAWA"            ← طبقة نص أو Shape — Reveal من أسفل
├── TEXT "PRODUCTION"      ← طبقة نص — tracking animation
├── LINE ACCENT            ← Solid رفيع أو Shape مستطيل
└── GLOW COMP              ← Adjustment Layer + Fast Box Blur + Curves
```

---

### أكواد AE — Expressions

**① LIGHT SWEEP — Position أفقي (شريط الضوء الأول):**

```javascript
dur = 0.42;
xStart = -300;
xEnd = thisComp.width + 300;
x = ease(time, inPoint, inPoint + dur, xStart, xEnd);
[x, value[1]];
```

**② LOGO OUTLINE — Trim Paths → End (رسم الخطوط):**

```javascript
// ضعه على خاصية "End" داخل Trim Paths
dur = 0.65;
ease(time, inPoint, inPoint + dur, 0, 100);
```

**③ LOGO FILL — Opacity (ظهور Fill بعد اكتمال الرسم):**

```javascript
delayAfterStroke = 0.15;
dur = 0.38;
t0 = inPoint + delayAfterStroke;
ease(time, t0, t0 + dur, 0, 100);
```

**④ TEXT "PRODUCTION" — Tracking Amount (حروف تتفرق بنعومة):**

```javascript
// ضعه على Text Animator → Tracking Amount
dur = 0.55;
ease(time, inPoint, inPoint + dur, 220, 100);
```

**⑤ TEXT "PRODUCTION" — Opacity:**

```javascript
dur = 0.45;
ease(time, inPoint, inPoint + dur, 0, 100);
```

**⑥ LINE ACCENT — Scale أفقي فقط (يمتد من المركز):**

```javascript
tMin = inPoint;
dur = 0.38;
ease(time, tMin, tMin + dur, [0, value[1]], [100, value[1]]);
```

**⑦ GLOW PULSE — Fast Box Blur → Blur Radius (توهج ينبض مرة):**

```javascript
peakTime = 2.85;
halfLife = 0.28;
t = Math.abs(time - peakTime);
val = Math.max(0, 22 * (1 - (t / halfLife)));
val;
```

**⑧ الكل معًا — Opacity الاختفاء النهائي (على Pre-comp أو Adjustment):**

```javascript
holdEnd = 2.80;
fadeOut = 0.55;
if (time < holdEnd) 100;
else ease(time, holdEnd, holdEnd + fadeOut, 100, 0);
```

**⑨ Scale خروج ناعم (Zoom خفيف للأمام أثناء الاختفاء):**

```javascript
holdEnd = 2.80;
fadeOut = 0.55;
ease(time, holdEnd, holdEnd + fadeOut, [100, 100], [104, 104]);
```

---

### تلميحات الجودة

- **الخط الذهبي:** Gradient Stroke من `#FBF3DF` (وسط — نقطة ضوء) إلى `#8E661E` (أطراف — عمق) — هذا يعطي إحساس الذهب المنحوت.
- **PRODUCTION:** اجعل الـ tracking يبدأ من ≈ 800 ويصل إلى القيمة الطبيعية (حوالي 120–150) لتأثير أكثر سينمائية.
- **Alpha للتصدير:** اجعل طبقة الخلفية `Shy` أو أطفئها قبل التصدير لتصدير webm بقناة شفافة كاملة.
- **Lottie:** إن أردت Lottie، حوّل كل Text Layer لـ Shape Layer (Layer → Create Shapes from Text) قبل التصدير بـ Bodymovin.

---

## 2 — خلفية الهيرو الحية

**عنوان:** Hero — لوب بيئي سينمائي

**وصف الموشن:** ضباب خفيف، أشعة ذهبية تتحرّك ببطء، جسيمات نادرة؛ لوب طويل بدون قفزة بصرية بين أول وآخر إطار.

**صيغة الملف:**  
`public/assets/video/hero-ambient.webm` *(VP9)* + `hero-ambient.mp4` *(H.264)*  
مقاس **1920 × 1080**، **30 fps**، لوب **≈ 12–14 ث**.

**التعبير الخاص به (أكواد AE):**

*طبقة ضوء/هالة — **Position** (إزاحة دائرية بطيئة):*

```javascript
ampX = 40;
ampY = 25;
spd = 0.12;
[value[0] + ampX * Math.sin(time * Math.PI * 2 * spd),
 value[1] + ampY * Math.cos(time * Math.PI * 2 * spd * 0.93)];
```

*على **Solid + Fractal Noise** — خاصية **Evolution** (ضباب يتحرك بلا كلِف):*

```javascript
time * 45;
```

*لاختبار حركة تعود على نفسها أثناء التصميم (ثم احذف التعبير وصدِّر لوبًا نهائيًا مقفلًا يدويًا) — أي خاصية رقمية مثل Rotation خفيفة:*

```javascript
loopOut("pingpong", 0);
```

---

## 3 — انتقال بين شرائح الخدمات

**عنوان:** Wipe ضوء ذهقي بين الفصول

**وصف الموشن:** مسحة ضوء ذهقية أفقية قصيرة (light sweep)، جسر بين خدمة وأخرى.

**صيغة الملف:**  
`public/assets/video/wipe-gold-sweep.webm` *(VP9 + Alpha)* ، **1920 × 1080** ، **≈ 0.6–0.9 ث**.

**التعبير الخاص به (أكواد AE):**

*شريط الضوء أو الـ Adjustment — **Position** أفقي بتسارع ناعم (يشبه ease سينمائي):*

```javascript
start = inPoint;
dur = 0.78;
ease(time, start, start + dur, [-400, value[1]], [2200, value[1]]);
```

*(بدِّل −400 و 2200 ليبدأ خارج الإطار ويخرج من الجهة المقابلة حسب اتجاه المسح.)*

***Opacity** لمزج طرفي الشريط بلطف:**

```javascript
start = inPoint;
dur = 0.78;
edge = dur * 0.22;
fadeInOp = linear(time, start, start + edge, 0, 100);
fadeOutOp = linear(time, start + dur - edge, start + dur, 100, 0);
Math.min(fadeInOp, fadeOutOp);
```

---

## 4 — خلفية قسم الذكاء الاصطناعي

**عنوان:** AI Section — شبكة خطوط وعقد

**وصف الموشن:** خطوط وعقد تتحرك ببطء، abstract، لا وجوه ولا شعارات؛ لوب.

**صيغة الملف:**  
`public/assets/video/ai-neural-loop.webm` + `ai-neural-loop.mp4` ، **1920 × 1080** ، لوب **≈ 12–18 ث**.

**التعبير الخاص به (أكواد AE):**

*طبقة العقد الصغيرة — **Position** (اهتزاز خفيف مُقيّد):*

```javascript
wiggle(0.6, 10);
```

*لحركة أكثر انتظامًا من دون تشويش كل الإطارات — قيِّد الزمن لمظهر خطوأي:*

```javascript
posterizeTime(8);
wiggle(0.5, 9);
```

*طبقة فارغة (Null) لتسيير شبكة خطوط ببطء — **Rotation** أو **Position** وفق المركز:*

```javascript
time * 6;
```
*(على **Rotation**؛ أبطِئ أو أسرّع بتغيير `6`.)*

*لُوب لا نهائي داخل المعاينة (قبل Baking نهائي للوب المغلق) — أي خاصية لها مفتاح أول وأخير متطابقان:*

```javascript
loopOut("cycle");
```

---

**اختتام:** طابق أول الإطار وآخر الإطار يدويًا قبل التصدير النهائي إن لم تكن تستخدم تعبيرات لوب؛ ثم ضع الملفات تحت `public/assets/…` في مشروع الويب.
