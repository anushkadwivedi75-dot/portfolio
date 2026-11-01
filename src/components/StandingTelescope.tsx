interface StandingTelescopeProps {
  /** 3D rotation around Y axis in degrees (-30 to 0) */
  rotateY?: number;
  /** 3D tilt around X axis in degrees (7 to 0) */
  rotateX?: number;
  /** Scale magnification (1.0 to 32.0+) */
  scale?: number;
  /** Overall opacity (0 to 1) */
  opacity?: number;
}

/**
 * Sleek, Refined, Hyper-Realistic Standing Astronomical Refractor Telescope.
 *
 * Designed with precision engineering:
 * - High-end materials: Brushed warm brass, titanium, dark walnut tripod, and multi-coated optical glass.
 * - Anchored at exact 50% 50% (300, 375 in 600x750 space) for zero-drift rotation and 32x zoom directly into the eyepiece.
 * - Vector SVG with specular highlights, realistic ambient occlusion, and etched astronomical reticle.
 */
export default function StandingTelescope({
  rotateY = 0,
  rotateX = 0,
  scale = 1,
  opacity = 1,
}: StandingTelescopeProps) {
  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none w-full h-full"
      style={{
        opacity,
        perspective: 1200,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      {/* 3D Rotating & Zooming Precision Instrument */}
      <div
        className="relative"
        style={{
          transform: `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 600 750"
          className="w-[340px] sm:w-[440px] md:w-[540px] lg:w-[620px] h-auto drop-shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Ambient Contact Shadows */}
            <filter id="softContactBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <filter id="hardContactBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
            <filter id="starlightDiffraction" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.2" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Architectural Satin Walnut Wood Legs */}
            <linearGradient id="walnutLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a0c06" />
              <stop offset="35%" stopColor="#451f11" />
              <stop offset="70%" stopColor="#6e331b" />
              <stop offset="100%" stopColor="#291107" />
            </linearGradient>
            <linearGradient id="walnutRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#291107" />
              <stop offset="30%" stopColor="#6e331b" />
              <stop offset="65%" stopColor="#451f11" />
              <stop offset="100%" stopColor="#1a0c06" />
            </linearGradient>
            <linearGradient id="walnutBack" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f0703" />
              <stop offset="50%" stopColor="#2b130a" />
              <stop offset="100%" stopColor="#0a0502" />
            </linearGradient>

            {/* Brushed Satin Champagne Brass (Luxury Engineering Metal) */}
            <linearGradient id="brassBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="22%" stopColor="#b45309" />
              <stop offset="48%" stopColor="#fef08a" />
              <stop offset="75%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="brassHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="18%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="82%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>

            {/* Brushed Stainless Steel & Chrome Cylinders */}
            <linearGradient id="chromeCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="35%" stopColor="#cbd5e1" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="80%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Aircraft-Grade Gunmetal & Dark Titanium Housing */}
            <linearGradient id="gunmetalHousing" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            {/* Gloss Obsidian Refractor Barrel with Cylindrical Light Reflection */}
            <linearGradient id="tubeSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="25%" stopColor="#18181b" />
              <stop offset="45%" stopColor="#3f3f46" />
              <stop offset="55%" stopColor="#52525b" />
              <stop offset="70%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            {/* Multi-Coated Deep Space Optical Glass (Spectral Magenta, Violet & Amber Sheen) */}
            <radialGradient id="multiCoatedLens" cx="46%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="12%" stopColor="#fef08a" stopOpacity="0.88" />
              <stop offset="26%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#581c87" stopOpacity="0.88" />
              <stop offset="75%" stopColor="#1e1b4b" stopOpacity="0.95" />
              <stop offset="92%" stopColor="#0c0a1f" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </radialGradient>

            {/* Specular Curved Reflection Arcs (Realistic Glass Curvature) */}
            <linearGradient id="glassCurvatureGlare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="40%" stopColor="#c084fc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Circular Path for Laser-Engraved Eyepiece Typography */}
            <path
              id="eyepieceTelemetryRim"
              d="M 262,375 A 38,38 0 1,1 338,375 A 38,38 0 1,1 262,375"
              fill="none"
            />
          </defs>

          {/* ============================================================== */}
          {/* 1. REALISTIC GROUND CONTACT SHADOW                             */}
          {/* ============================================================== */}
          <ellipse
            cx="300"
            cy="712"
            rx="220"
            ry="26"
            fill="#000000"
            opacity="0.65"
            filter="url(#softContactBlur)"
          />
          <ellipse
            cx="300"
            cy="712"
            rx="120"
            ry="14"
            fill="#000000"
            opacity="0.8"
            filter="url(#hardContactBlur)"
          />

          {/* ============================================================== */}
          {/* 2. TRIPOD STAND: BACK LEG (In atmospheric shadow)             */}
          {/* ============================================================== */}
          <g id="tripod-back-leg" opacity="0.85">
            <polygon points="295,412 305,412 304,690 296,690" fill="url(#walnutBack)" />
            <line x1="300" y1="420" x2="300" y2="680" stroke="#080402" strokeWidth="1.5" />
            <rect x="294" y="562" width="12" height="18" rx="2" fill="url(#brassBevel)" />
            <polygon points="296,688 304,688 301,703 299,703" fill="url(#brassBevel)" />
            <ellipse cx="300" cy="704" rx="4" ry="2" fill="#09090b" />
          </g>

          {/* ============================================================== */}
          {/* 3. TRIPOD ACCESSORY SPREADER TRAY                              */}
          {/* ============================================================== */}
          <g id="spreader-tray">
            {/* Satin brass triangular tray */}
            <polygon
              points="218,552 382,552 300,571"
              fill="url(#brassHorizontal)"
              stroke="#78350f"
              strokeWidth="1"
            />
            {/* Tray beveled rim lip */}
            <polygon
              points="218,552 382,552 382,556 300,575 218,556"
              fill="#5f280a"
            />
            {/* Precision eyepiece storage receptacles */}
            <ellipse cx="262" cy="558" rx="9" ry="4.5" fill="#09090b" stroke="#fef08a" strokeWidth="0.7" opacity="0.85" />
            <ellipse cx="338" cy="558" rx="9" ry="4.5" fill="#09090b" stroke="#fef08a" strokeWidth="0.7" opacity="0.85" />
            <ellipse cx="300" cy="564" rx="9" ry="4.5" fill="#09090b" stroke="#fef08a" strokeWidth="0.7" opacity="0.85" />
            {/* Center tensioning steel column & locking knob */}
            <rect x="297" y="416" width="6" height="142" fill="url(#chromeCylinder)" />
            <circle cx="300" cy="578" r="6" fill="url(#brassBevel)" stroke="#451a03" strokeWidth="1" />
          </g>

          {/* ============================================================== */}
          {/* 4. TRIPOD STAND: FRONT LEFT & RIGHT DUAL-STRUT LEGS            */}
          {/* ============================================================== */}
          <g id="tripod-front-legs">
            {/* --- LEFT LEG --- */}
            <polygon points="282,412 290,412 188,576 180,576" fill="url(#walnutLeft)" />
            <polygon points="290,412 296,412 200,576 194,576" fill="url(#walnutLeft)" opacity="0.9" />
            <rect x="232" y="486" width="28" height="6" rx="1.5" transform="rotate(-30 246 489)" fill="url(#brassBevel)" />
            <rect x="180" y="572" width="22" height="18" rx="2" transform="rotate(-31 191 581)" fill="url(#brassBevel)" stroke="#78350f" strokeWidth="0.7" />
            <circle cx="187" cy="582" r="3" fill="#451a03" />
            <polygon points="186,586 194,586 142,704 136,704" fill="url(#walnutLeft)" />
            <polygon points="135,700 144,700 139,714 136,714" fill="url(#brassBevel)" />
            <ellipse cx="138" cy="714" rx="6" ry="2.5" fill="#09090b" />

            {/* --- RIGHT LEG --- */}
            <polygon points="318,412 310,412 412,576 420,576" fill="url(#walnutRight)" />
            <polygon points="310,412 304,412 400,576 406,576" fill="url(#walnutRight)" opacity="0.9" />
            <rect x="340" y="486" width="28" height="6" rx="1.5" transform="rotate(30 354 489)" fill="url(#brassBevel)" />
            <rect x="398" y="572" width="22" height="18" rx="2" transform="rotate(31 409 581)" fill="url(#brassBevel)" stroke="#78350f" strokeWidth="0.7" />
            <circle cx="413" cy="582" r="3" fill="#451a03" />
            <polygon points="414,586 406,586 458,704 464,704" fill="url(#walnutRight)" />
            <polygon points="456,700 465,700 461,714 458,714" fill="url(#brassBevel)" />
            <ellipse cx="462" cy="714" rx="6" ry="2.5" fill="#09090b" />

            {/* Solid Cast Brass Crown Hub */}
            <path
              d="M 276,408 L 324,408 L 330,422 L 270,422 Z"
              fill="url(#brassBevel)"
              stroke="#5f280a"
              strokeWidth="1"
            />
            <rect x="284" y="420" width="32" height="8" rx="2" fill="url(#gunmetalHousing)" />
          </g>

          {/* ============================================================== */}
          {/* 5. GERMAN EQUATORIAL MOUNT HEAD (GEM)                          */}
          {/* ============================================================== */}
          <g id="equatorial-mount">
            {/* Azimuth Base Plate & 360° Circular Degree Ring */}
            <ellipse cx="300" cy="408" rx="29" ry="7" fill="url(#brassBevel)" stroke="#78350f" strokeWidth="0.8" />
            <ellipse cx="300" cy="405" rx="27" ry="5.5" fill="url(#gunmetalHousing)" />

            {/* Altitude Latitude Polar Wedge housing (~35°) */}
            <polygon points="288,404 312,404 318,366 282,366" fill="url(#gunmetalHousing)" stroke="#27272a" strokeWidth="1" />
            {/* Laser-etched latitude degree quadrant scale */}
            <path d="M 314,398 A 16,16 0 0,0 318,375 L 312,375 Z" fill="url(#brassBevel)" />
            <line x1="312" y1="386" x2="317" y2="386" stroke="#451a03" strokeWidth="0.8" />

            {/* Right Ascension (RA) Gear Box */}
            <rect x="286" y="353" width="28" height="16" rx="3" fill="url(#brassBevel)" stroke="#78350f" strokeWidth="0.8" />
            <line x1="290" y1="361" x2="310" y2="361" stroke="#fef08a" strokeWidth="1" />

            {/* Declination (DEC) Axis Housing */}
            <circle cx="300" cy="346" r="14" fill="url(#gunmetalHousing)" stroke="url(#brassBevel)" strokeWidth="1.5" />
            <circle cx="300" cy="346" r="7" fill="url(#brassBevel)" />

            {/* Stainless Counterweight Shaft pointing lower-left in 3D */}
            <line x1="290" y1="353" x2="216" y2="431" stroke="url(#chromeCylinder)" strokeWidth="6" strokeLinecap="round" />
            {/* Solid Cast Brass Cylindrical Counterweight */}
            <rect
              x="232"
              y="387"
              width="24"
              height="30"
              rx="4"
              transform="rotate(45 244 402)"
              fill="url(#brassBevel)"
              stroke="#5f280a"
              strokeWidth="1.2"
            />
            {/* Counterweight T-clamp locking bolt */}
            <circle cx="238" cy="391" r="3" fill="#fef08a" />
            {/* Stainless steel shaft safety stop nut */}
            <circle cx="216" cy="431" r="5" fill="url(#brassBevel)" />

            {/* Slow-motion manual adjustment cable with ribbed brass knob */}
            <path d="M 308,359 Q 335,386 342,411" fill="none" stroke="#52525b" strokeWidth="2.5" strokeDasharray="1.5 1.5" />
            <circle cx="342" cy="411" r="5" fill="url(#brassBevel)" stroke="#451a03" strokeWidth="0.8" />
          </g>

          {/* ============================================================== */}
          {/* 6. MAIN REFRACTOR TUBE ASSEMBLY (OTA) & CRADLE RINGS           */}
          {/* Sleek, cylindrical, pointing up towards stars at 32° elevation */}
          {/* ============================================================== */}
          <g id="optical-tube">
            {/* Tube Saddle Clamping Plate */}
            <rect
              x="272"
              y="337"
              width="56"
              height="14"
              rx="2.5"
              transform="rotate(-32 300 344)"
              fill="url(#gunmetalHousing)"
              stroke="#52525b"
              strokeWidth="0.8"
            />

            {/* Dual Cast Brass Mounting Rings */}
            <rect
              x="264"
              y="325"
              width="10"
              height="58"
              rx="2.5"
              transform="rotate(-32 269 354)"
              fill="url(#brassBevel)"
              stroke="#78350f"
              strokeWidth="0.8"
            />
            <rect
              x="320"
              y="289"
              width="10"
              height="58"
              rx="2.5"
              transform="rotate(-32 325 318)"
              fill="url(#brassBevel)"
              stroke="#78350f"
              strokeWidth="0.8"
            />
            <circle cx="258" cy="329" r="3" fill="#fef08a" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="314" cy="293" r="3" fill="#fef08a" stroke="#78350f" strokeWidth="0.6" />

            {/* MAIN REFRACTOR BARREL (Obsidian Finish with Specular Lighting) */}
            <polygon
              points="234,395 446,149 480,173 268,419"
              fill="url(#tubeSpecular)"
              stroke="#3f3f46"
              strokeWidth="0.8"
            />
            {/* High-Gloss Specular Ridge Highlight running along the barrel */}
            <polygon
              points="248,397 454,157 462,163 256,403"
              fill="#ffffff"
              opacity="0.22"
            />

            {/* Polished Brass Center Accent Ring */}
            <polygon
              points="350,261 360,249 376,261 366,273"
              fill="url(#brassBevel)"
              stroke="#78350f"
              strokeWidth="0.6"
            />

            {/* FRONT DEW SHIELD (Objective Lens Hood) */}
            <polygon
              points="436,159 486,99 522,127 472,187"
              fill="url(#tubeSpecular)"
              stroke="#52525b"
              strokeWidth="1"
            />
            {/* Flared Knurled Brass Front Rim Bezel */}
            <polygon
              points="480,106 492,92 528,120 516,134"
              fill="url(#brassBevel)"
              stroke="#78350f"
              strokeWidth="1"
            />
            {/* Front Objective Glass Lens with Cosmic Violet / Cyan Coating Reflections */}
            <ellipse
              cx="505"
              cy="113"
              rx="24"
              ry="11"
              transform="rotate(-40 505 113)"
              fill="#38bdf8"
              opacity="0.75"
            />
            <ellipse
              cx="505"
              cy="113"
              rx="18"
              ry="7"
              transform="rotate(-40 505 113)"
              fill="#c084fc"
              opacity="0.8"
            />

            {/* --- FINDER SCOPE (Mounted in twin brass stalks above main tube) --- */}
            <rect x="330" y="271" width="4" height="24" transform="rotate(-32 332 283)" fill="url(#brassBevel)" />
            <rect x="382" y="237" width="4" height="24" transform="rotate(-32 384 249)" fill="url(#brassBevel)" />
            <polygon
              points="314,261 416,181 426,193 324,273"
              fill="url(#tubeSpecular)"
              stroke="url(#brassBevel)"
              strokeWidth="0.8"
            />
            <circle cx="421" cy="187" r="6" fill="url(#brassBevel)" />
            <circle cx="319" cy="267" r="5" fill="url(#brassBevel)" />

            {/* --- FOCUSER DRAWTUBE & DUAL-SPEED BRASS WHEELS --- */}
            <polygon
              points="234,395 260,365 278,379 252,409"
              fill="url(#chromeCylinder)"
              stroke="#71717a"
              strokeWidth="0.6"
            />
            {/* Dual-Speed 10:1 Micro-Focus Knobs */}
            <circle cx="244" cy="413" r="12" fill="url(#brassBevel)" stroke="#5f280a" strokeWidth="1" />
            <circle cx="244" cy="413" r="6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            <line x1="234" y1="413" x2="254" y2="413" stroke="#78350f" strokeWidth="0.8" />
            <line x1="244" y1="403" x2="244" y2="423" stroke="#78350f" strokeWidth="0.8" />
          </g>

          {/* ============================================================== */}
          {/* 7. 90° DIELECTRIC STAR DIAGONAL PRISM                          */}
          {/* ============================================================== */}
          <g id="star-diagonal">
            <polygon
              points="260,379 300,349 322,375 282,405"
              fill="url(#gunmetalHousing)"
              stroke="url(#brassBevel)"
              strokeWidth="1.2"
            />
            <rect
              x="272"
              y="367"
              width="30"
              height="20"
              rx="3"
              transform="rotate(32 287 377)"
              fill="url(#brassBevel)"
              opacity="0.85"
            />
          </g>

          {/* ============================================================== */}
          {/* 8. OCULAR EYEPIECE (THE HERO ZOOM TARGET: ANCHORED AT 300, 375) */}
          {/* Exactly 50% 50% center of the coordinate space                */}
          {/* ============================================================== */}
          <g id="ocular-eyepiece" className="transition-transform duration-75">
            {/* Depth shadow ring behind eyepiece collar */}
            <circle
              cx="300"
              cy="375"
              r="62"
              fill="#000000"
              opacity="0.55"
              filter="url(#softContactBlur)"
            />

            {/* Outer Knurled Champagne Brass Aperture Ring */}
            <circle
              cx="300"
              cy="375"
              r="53"
              fill="url(#brassBevel)"
              stroke="#5f280a"
              strokeWidth="1.6"
            />

            {/* Micro Knurling Grip Teeth Pattern */}
            <circle
              cx="300"
              cy="375"
              r="50"
              fill="none"
              stroke="#fef08a"
              strokeWidth="1.8"
              strokeDasharray="2 2"
              opacity="0.85"
            />
            <circle
              cx="300"
              cy="375"
              r="47"
              fill="none"
              stroke="#78350f"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity="0.9"
            />

            {/* CNC Anodized Matte Dark Titanium Eyepiece Barrel */}
            <circle
              cx="300"
              cy="375"
              r="45"
              fill="url(#gunmetalHousing)"
              stroke="#18181b"
              strokeWidth="1.5"
            />

            {/* Laser-Engraved Telemetry Text on the circular bezel */}
            <text
              fontSize="4.5"
              fontFamily="monospace"
              fill="#fef08a"
              letterSpacing="1.2"
              opacity="0.9"
            >
              <textPath href="#eyepieceTelemetryRim" startOffset="50%" textAnchor="middle">
                ✦ CELESTIAL OPTICS • 82° ULTRA WIDE • f/4.5 • 16mm ✦
              </textPath>
            </text>

            {/* Soft Fold-Down Rubber Eyecup Collar */}
            <circle
              cx="300"
              cy="375"
              r="35"
              fill="#18181b"
              stroke="#09090b"
              strokeWidth="3.2"
            />
            <circle
              cx="300"
              cy="375"
              r="33"
              fill="none"
              stroke="#27272a"
              strokeWidth="1"
            />

            {/* ============================================================ */}
            {/* MULTI-COATED DEEP SPACE OPTICAL GLASS LENS                   */}
            {/* ============================================================ */}
            <circle
              cx="300"
              cy="375"
              r="30"
              fill="url(#multiCoatedLens)"
              stroke="#3b0764"
              strokeWidth="1.2"
            />

            {/* Specular Glare Highlight Arcs (Glass Curvature) */}
            <path
              d="M 279,355 A 25,25 0 0,1 321,355"
              fill="none"
              stroke="url(#glassCurvatureGlare)"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M 275,366 A 26,26 0 0,1 282,353"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* ============================================================ */}
            {/* PRECISION ASTRONOMICAL RETICLE & CROSSHAIRS                  */}
            {/* ============================================================ */}
            <g id="precision-reticle" opacity="0.88" stroke="#fef08a">
              {/* Outer Coordinate Dashed Ring */}
              <circle
                cx="300"
                cy="375"
                r="23"
                fill="none"
                strokeWidth="0.5"
                strokeDasharray="2 1.5"
                opacity="0.65"
              />
              {/* Inner Focus Rings */}
              <circle
                cx="300"
                cy="375"
                r="13"
                fill="none"
                strokeWidth="0.6"
                opacity="0.8"
              />
              <circle
                cx="300"
                cy="375"
                r="5.5"
                fill="none"
                strokeWidth="0.5"
                opacity="0.9"
              />

              {/* Crosshair Horizontal & Vertical Lines */}
              <line x1="271" y1="375" x2="329" y2="375" strokeWidth="0.6" opacity="0.75" />
              <line x1="300" y1="346" x2="300" y2="404" strokeWidth="0.6" opacity="0.75" />

              {/* Milliradian Precision Ticks */}
              <line x1="300" y1="363" x2="303.5" y2="363" strokeWidth="0.7" />
              <line x1="300" y1="367" x2="302.5" y2="367" strokeWidth="0.7" />
              <line x1="300" y1="383" x2="302.5" y2="383" strokeWidth="0.7" />
              <line x1="300" y1="387" x2="303.5" y2="387" strokeWidth="0.7" />

              <line x1="288" y1="375" x2="288" y2="378.5" strokeWidth="0.7" />
              <line x1="292" y1="375" x2="292" y2="377.5" strokeWidth="0.7" />
              <line x1="308" y1="375" x2="308" y2="377.5" strokeWidth="0.7" />
              <line x1="312" y1="375" x2="312" y2="378.5" strokeWidth="0.7" />

              {/* Telemetry Coordinate Readouts */}
              <text x="303" y="361" fill="#fef08a" fontSize="3.2" fontFamily="monospace" opacity="0.85">
                f/2.8
              </text>
              <text x="303" y="394" fill="#fef08a" fontSize="3.2" fontFamily="monospace" opacity="0.85">
                DEC +62°
              </text>
              <text x="273" y="373" fill="#fef08a" fontSize="3.2" fontFamily="monospace" opacity="0.85">
                RA 14h
              </text>
            </g>

            {/* Glowing Golden Celestial Focal Star */}
            <g id="focal-star" filter="url(#starlightDiffraction)">
              {/* 4-Point Diffraction Spike Flare */}
              <line x1="291" y1="375" x2="309" y2="375" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              <line x1="300" y1="366" x2="300" y2="384" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              {/* Core Star Elements */}
              <circle cx="300" cy="375" r="2.5" fill="#ffffff" />
              <circle cx="300" cy="375" r="1.4" fill="#fef08a" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
