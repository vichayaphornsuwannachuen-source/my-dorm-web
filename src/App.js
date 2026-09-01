import React, { useState } from 'react';
import './App.css';

const filterNames = {
    TH: ['หอพักทั้งหมด', 'หอพักชาย', 'หอพักหญิง', 'หอพักพัดลม', 'หอพักปรับอากาศ', 'จำนวน 2 คน', 'จำนวน 3 คน', 'จำนวน 4 คน'],
    EN: ['All Dorms', 'Male Dorm', 'Female Dorm', 'Fan Dorm', 'Air Dorm', '2 Persons', '3 Persons', '4 Persons']
  };


function App() {
  const [lang, setLang] = useState('TH');
  const [filters, setFilters] = useState([]);
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [viewMode, setViewMode] = useState('360');

  // ข้อมูลหอพัก (ไม่ต้องแก้จุดนี้ครับโมจิ)
  const dorms = [
    { id: 1, nameTH: "หอพักลำดวน 1", nameEN: "Lamduan 1", type: "ชาย", air: "ปรับอากาศ", cap: "4 คน", gps: "https://maps.app.goo.gl/FMvNZ9VAhdbZoBBn7", videoUrl: "LBcXs-wWwDo", videoUrl2: "", image: "/l1.jpg"},
    { id: 2, nameTH: "หอพักลำดวน 2", nameEN: "Lamduan 2", type: "ชาย", air: "พัดลม", cap: "4 คน", gps: "", videoUrl: "", videoUrl2: "", image: "/l2.jpg" },
    { id: 3, nameTH: "หอพักลำดวน 3", nameEN: "Lamduan 3", type: "ชาย", air: "ปรับอากาศ", cap: "4 คน", gps: "https://maps.app.goo.gl/w7Pd9LGRBPyakJ5S9",  videoUrl: "", videoUrl2: "",image: "/l3.jpg"},
    { id: 4, nameTH: "หอพักลำดวน 4", nameEN: "Lamduan 4", type: "ชาย", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/mFb1v18Xo8N6Bkqe6", videoUrl: "", videoUrl2: "", image: "/l4.jpg" },
    { id: 5, nameTH: "หอพักลำดวน 5", nameEN: "Lamduan 5", type: "ชาย", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/WJBTMbxnZBFoPxn78", videoUrl: "", videoUrl2: "", image: "/l5.jpg"},
    { id: 6, nameTH: "หอพักลำดวน 6", nameEN: "Lamduan 6", type: "หญิง", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/d2esT7tLTb2FdAKV9", videoUrl: "", videoUrl2: "",image: "/l6.jpg"},
    { id: 7, nameTH: "หอพักลำดวน 7", nameEN: "Lamduan 7", type: "หญิง", air: "ปรับอากาศ", cap: "4 คน", gps: "https://maps.app.goo.gl/cJP3Gh92MPNBKdjD7",videoUrl: "", videoUrl2: "", image: "/l7.jpg" },
    { id: 8, nameTH: "หอพัก F1", nameEN: "Dorm F1", type: "หญิง", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/JY7VbfxykiiCSgaM9", videoUrl: "", videoUrl2: "", image: "/f1.jpg"},
    { id: 9, nameTH: "หอพัก F2", nameEN: "Dorm F2", type: "หญิง", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/REtk2znMin5zwpj99", videoUrl: "", videoUrl2: "", image: "/f2.jpg"},
    { id: 10, nameTH: "หอพัก F3", nameEN: "Dorm F3", type: "หญิง", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/ZLCvWtj1sYQbJzot9", videoUrl: "", videoUrl2: "", image: "/f3.jpg" },
    { id: 11, nameTH: "หอพัก F4", nameEN: "Dorm F4", type: "ชาย", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/AdxsmwS6mw7bB4NUA", videoUrl: "", videoUrl2: "", image: "/f4.jpg" },
    { id: 12, nameTH: "หอพัก F5", nameEN: "Dorm F5", type: "หญิง", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/2Scm791aSiEKYUQb6", videoUrl: "", videoUrl2: "", image: "/f5.jpg" },
    { id: 13, nameTH: "หอพัก F6", nameEN: "Dorm F6", type: "หญิง", air: "พัดลม", cap: "4 คน", gps: "https://maps.app.goo.gl/eLWD815Zwmxmvx88A", videoUrl: "", videoUrl2: "", image: "/f6.jpg" },
    { id: 14, nameTH: "หอพักสักทอง 1", nameEN: "Sakthong 1", type: "หญิง", air: "ปรับอากาศ", cap: "4 คน", gps: "https://maps.app.goo.gl/yu5DyqudiV6zqbJs6", videoUrl: "", videoUrl2: "", image: "/sk1.jpg"},
    { id: 15, nameTH: "หอพักสักทอง 2", nameEN: "Sakthong 2", type: "หญิง", air: "ปรับอากาศ", cap: "4 คน", gps: "https://maps.app.goo.gl/xxxx19", videoUrl: "6c95_pEn8wA", videoUrl2: "ZzW6EkQkREE", image: "/sk2.jpg"},
    { id: 16, nameTH: "หอพักสักทอง 3", nameEN: "Sakthong 3", type: "หญิง", air: "ปรับอากาศ", cap: "2 คน", gps: "https://maps.app.goo.gl/YdtoPXqvVmdLK4ev5",videoUrl: "xnp2MG-2klA", videoUrl2: "VapbgYkNeu4", image: "/sk3.jpg"},
    { id: 17, nameTH: "หอพักบุญทรง", nameEN: "Boonsong", type: "หญิง", air: "ปรับอากาศ", cap: "3 คน", gps: "https://maps.app.goo.gl/eLWD815Zwmxmvx88A", videoUrl: "QrgaBstWA0E", videoUrl2: "pvv3JVuarwM", image: "/bs.jpeg", tour360Url : "/BoonsongWebGL/index.html" },
    { id: 18, nameTH: "หอพักประเสริฐ", nameEN: "Prasert", type: "หญิง", air: "ปรับอากาศ", cap: "2 คน", gps: "https://maps.app.goo.gl/oc9qWcV6rpBwW2Fs6", videoUrl: "n5qK6ub_kyU", videoUrl2: "uK7oKUibfFg", image: "/ps.jpg" },
    { id: 19, nameTH: "หอพักพล.ต.อ.เภาฯ", nameEN:"Pol.Gen.Phao", type: "หญิง", air: "ปรับอากาศ", cap: "2 คน", gps: "https://maps.app.goo.gl/xxxx23", videoUrl: "avQpaQlDL-w", videoUrl2: "bpv83aEJMHs", image: "/nana.jpg" },
  ];

    const checkMatch = (dorm, currentFilters) => {
    const filtersWithoutVDO = currentFilters.filter(f => f !== 'VDO');
    if (filtersWithoutVDO.length === 0) return true;

    const genderF = filtersWithoutVDO.filter(f => ['หอพักชาย', 'หอพักหญิง', 'Male', 'Female'].includes(f));
    const airF = filtersWithoutVDO.filter(f => ['หอพักพัดลม', 'หอพักปรับอากาศ', 'Fan', 'Air Con'].includes(f));
    const capF = filtersWithoutVDO.filter(f => f.includes('คน') || f.includes('Persons'));

    const matchG = genderF.length === 0 || genderF.some(f => f.includes(dorm.type) || (dorm.type === 'ชาย' ? f === 'Male' : f === 'Female'));
    const matchA = airF.length === 0 || airF.some(f => f.includes(dorm.air) || (dorm.air === 'พัดลม' ? f === 'Fan' : f === 'Air Con'));
    const matchC = capF.length === 0 || capF.some(f => f.includes(dorm.cap.split(' ')[0]));

    return matchG && matchA && matchC;
  };

  const filteredDorms = dorms.filter(dorm => checkMatch(dorm, filters));

  const toggleFilter = (filterName) => {
    if (filterName === 'หอพักทั้งหมด' || filterName === 'All Dorms') { setFilters([]); return; }
    setFilters(prev => {
      let next = [...prev];
      if (['หอพักชาย', 'หอพักหญิง', 'Male', 'Female'].includes(filterName)) { next = next.filter(f => !['หอพักชาย', 'หอพักหญิง', 'Male', 'Female'].includes(f)); }
      else if (['หอพักพัดลม', 'หอพักปรับอากาศ', 'Fan', 'Air Con'].includes(filterName)) { next = next.filter(f => !['หอพักพัดลม', 'หอพักปรับอากาศ', 'Fan', 'Air Con'].includes(f)); }
      else if (filterName.includes('คน') || filterName.includes('Persons')) { next = next.filter(f => !f.includes('คน') && !f.includes('Persons')); }
      return prev.includes(filterName) ? next.filter(f => f !== filterName) : [...next, filterName];
    });
  };

  const isFilterDisabled = (filterName) => {
    if (filters.includes(filterName) || filterName === 'หอพักทั้งหมด' || filterName === 'VDO') return false;
    let mockFilters = [...filters];
    if (['หอพักชาย', 'หอพักหญิง'].includes(filterName)) mockFilters = mockFilters.filter(f => !['หอพักชาย', 'หอพักหญิง'].includes(f));
    if (['หอพักพัดลม', 'หอพักปรับอากาศ'].includes(filterName)) mockFilters = mockFilters.filter(f => !['หอพักพัดลม', 'หอพักปรับอากาศ'].includes(f));
    if (filterName.includes('คน')) mockFilters = mockFilters.filter(f => !f.includes('คน'));
    return !dorms.some(dorm => checkMatch(dorm, [...mockFilters, filterName]));
  };

  return (
    <div className="App">
      {/* Navbar & Side Menu */}
      <nav className="nav-bar">
        <div className="logo-section" onClick={() => {setSelectedDorm(null); setFilters([]); setViewMode('360');}} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="Logo" className="mfu-logo" /><span className="home-text">Home Page</span>
        </div>
        <div className="nav-right">
          <div className="lang-switch">
            <button className={lang === 'TH' ? 'active' : ''} onClick={() => setLang('TH')}>TH</button>
            <button className={lang === 'EN' ? 'active' : ''} onClick={() => setLang('EN')}>EN</button>
          </div>
          <div className="hamburger" onClick={() => setIsMenuOpen(true)}><span></span><span></span><span></span></div>
        </div>
      </nav>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={() => setIsMenuOpen(false)}>×</div>
        <div className="creator-profile">
          <div className="profile-img-box"><img src="/Moji.jpg" alt="Dev" className="creator-img" /></div>
          <h3>{lang === 'TH' ? 'ผู้พัฒนา' : 'Developers'}</h3><p>Vichayaphorn (DCE)</p>
        </div>
      </div>
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <div className="container">
        {!selectedDorm ? (
          <>
            <header className="hero-banner" style={{ backgroundImage: "url('/cover.jpg')" }}>
              <div className="hero-overlay"><h1>{lang === 'TH' ? 'สำรวจหอพักนักศึกษา' : 'Explore Dorms'}</h1></div>
            </header>

            {/* Filter Bar หน้าแรก */}
            <div className="filter-bar">
        {filterNames[lang].map((btn, i) => {
          const val = filterNames['TH'][i];
          const active = val === 'หอพักทั้งหมด' ? filters.length === 0 : filters.includes(val);
          const disabled = isFilterDisabled(val);
          return (
            <button 
              key={val} 
              className={`${active ? 'active' : ''} ${disabled ? 'disabled-btn' : ''}`} 
              onClick={() => !disabled && toggleFilter(val)}
            >
              {btn}
            </button>
          );
        })}
      </div>
            
            <div className="dorm-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
              {filteredDorms.map(dorm => (
                <div key={dorm.id} className="dorm-card" onClick={() => { setSelectedDorm(dorm); setViewMode('360'); }}>
                  <img 
                    src={dorm.image || "/image.jpeg"} 
                    alt={dorm.nameTH} 
                    className="dorm-card-img" 
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
                  />
                  <div className="dorm-card-info">
                    <h3>{lang === 'TH' ? dorm.nameTH : dorm.nameEN}</h3>
                    <p>{dorm.type} | {dorm.air} | {dorm.cap}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
) : (
          <div className="detail-page">
            {/* ปุ่มย้อนกลับหน้าหลัก */}
            <button className="back-btn" onClick={() => { setSelectedDorm(null); setViewMode('360'); }} style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}>
              {lang === 'TH' ? '← ย้อนกลับหน้าหลัก' : '← Back to Main'}
            </button>
            
            <h2 className="detail-name" style={{ fontSize: '32px', color: '#1A2B4C', marginBottom: '25px' }}>
              {lang === 'TH' ? selectedDorm.nameTH : selectedDorm.nameEN}
            </h2>

            {/* 1. สื่อหลัก (Unity 360 / VDO) */}
            {viewMode === 'vdo' ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: '30px', 
                margin: '0 auto 25px', 
                width: '100%', 
                maxWidth: '1200px' 
              }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ background: '#1A2B4C', color: '#FFFFFF', padding: '12px 20px', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {lang === 'TH' ? 'หน้าตึก → หน้าห้อง' : 'Building → Door'}
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedDorm.videoUrl}`} title="YouTube video 1" frameBorder="0" allowFullScreen style={{ border: 'none', display: 'block' }}></iframe>
                  </div>
                </div>

                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ background: '#1A2B4C', color: '#FFFFFF', padding: '12px 20px', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {lang === 'TH' ? 'หน้าห้อง → ในห้อง' : 'Door → Inside'}
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedDorm.videoUrl2 || selectedDorm.videoUrl}`} title="YouTube video 2" frameBorder="0" allowFullScreen style={{ border: 'none', display: 'block' }}></iframe>
                  </div>
                </div>
              </div>
            ) : selectedDorm.tour360Url ? (
              <div className="tour-360-wrapper" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 25px', borderRadius: '24px', overflow: 'hidden', border: '3px solid #1A2B4C', boxShadow: '0 12px 35px rgba(0,0,0,0.2)', background: '#000' }}>
                <iframe title="Unity 360 Virtual Tour" src={selectedDorm.tour360Url} style={{ width: '100%', height: '700px', border: 'none', display: 'block' }} scrolling="no" allowFullScreen />
              </div>
            ) : (
              <div className="room-frame" style={{ maxWidth: '850px', margin: '0 auto 25px' }}>
                <img src={selectedDorm.image || "/cover.jpg"} alt="Room" className="room-img" style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '20px' }} />
              </div>
            )}

            {/* 2. ปุ่มสลับสื่อ 2 ปุ่ม ใต้กรอบสื่อ */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
              <button 
                onClick={() => setViewMode('360')}
                style={{ 
                  padding: '12px 28px', 
                  borderRadius: '30px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  border: '2px solid #1A2B4C',
                  background: viewMode === '360' ? '#1A2B4C' : '#FFFFFF',
                  color: viewMode === '360' ? '#FFFFFF' : '#1A2B4C',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                {lang === 'TH' ? '🖼️ มุมมอง 360° / รูปภาพ' : '🖼️ 360° / Photos'}
              </button>
              <button 
                onClick={() => setViewMode('vdo')}
                style={{ 
                  padding: '12px 28px', 
                  borderRadius: '30px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  border: '2px solid #1A2B4C',
                  background: viewMode === 'vdo' ? '#1A2B4C' : '#FFFFFF',
                  color: viewMode === 'vdo' ? '#FFFFFF' : '#1A2B4C',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                {lang === 'TH' ? '🎥 วิดีโอรีวิว (VDO)' : '🎥 VDO Walkthrough'}
              </button>
            </div>

            {/* 3. แถบฟิลเตอร์ 8 ปุ่ม (ลบ VDO ออก) */}
            <div className="filter-bar" style={{ margin: '15px 0 20px', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {filterNames[lang]
                .filter((_, i) => filterNames['TH'][i] !== 'VDO')
                .map((btn) => {
                  const originalIndex = filterNames[lang].indexOf(btn);
                  const val = filterNames['TH'][originalIndex];
                  const active = val === 'หอพักทั้งหมด' ? filters.length === 0 : filters.includes(val);
                  const disabled = isFilterDisabled(val);
                  return (
                    <button 
                      key={val} 
                      className={`${active ? 'active' : ''} ${disabled ? 'disabled-btn' : ''}`} 
                      onClick={() => !disabled && toggleFilter(val)}
                      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
                    >
                      {btn}
                    </button>
                  );
                })}
            </div>

            {/* 4. แถบการ์ดเลือกหอพักอื่นๆ ตามฟิลเตอร์ (กดเปลี่ยนหอได้ทันที) */}
            <div style={{ margin: '20px auto 40px', maxWidth: '1200px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1A2B4C', marginBottom: '12px', textAlign: 'center' }}>
                {lang === 'TH' ? 'เลือกดูหอพักอื่นตามฟิลเตอร์:' : 'Select other dorms matching filter:'}
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', justifyContent: filteredDorms.length < 5 ? 'center' : 'flex-start' }}>
                {filteredDorms.map((dorm) => (
                  <button
                    key={dorm.id}
                    onClick={() => {
                      setSelectedDorm(dorm);
                      setViewMode('360');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      flex: '0 0 auto',
                      padding: '10px 18px',
                      borderRadius: '16px',
                      border: dorm.id === selectedDorm.id ? '2px solid #1A2B4C' : '1px solid #D0E0F0',
                      background: dorm.id === selectedDorm.id ? '#EBF3FF' : '#FFFFFF',
                      color: '#1A2B4C',
                      fontWeight: dorm.id === selectedDorm.id ? 'bold' : 'normal',
                      cursor: 'pointer',
                      fontSize: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    {lang === 'TH' ? dorm.nameTH : dorm.nameEN}
                  </button>
                ))}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E1EDFF', margin: '30px 0' }} />

            {/* สิ่งอำนวยความสะดวก */}
            <div className="fac-tag" style={{ background: '#1A2B4C', color: 'white', padding: '12px 35px', borderRadius: '12px', display: 'inline-block', fontSize: '22px', marginBottom: '25px', fontWeight: '600' }}>
              {lang === 'TH' ? 'สิ่งอำนวยความสะดวก' : 'Facilities'}
            </div>
            
            <div className="fac-box-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', border: '2px solid #E1EDFF', borderRadius: '30px', padding: '40px', marginBottom: '40px', background: '#fcfcfc' }}>
              <div className="fac-col">
                <h4 style={{ color: '#1A2B4C', borderBottom: '2px solid #E1EDFF', paddingBottom: '10px', fontSize: '24px', marginTop: '0' }}>{lang === 'TH' ? 'ภายในห้อง' : 'In Room'}</h4>
                <ul style={{ listStyle: 'none', padding: '0', fontSize: '18px', lineHeight: '2.2', color: '#444' }}>
                  <li>• {lang === 'TH' ? 'เตียง' : 'Bed'}</li>
                  <li>• {lang === 'TH' ? 'โต๊ะ-เก้าอี้' : 'Table & Chair'}</li>
                  <li>• {lang === 'TH' ? 'ตู้เสื้อผ้า' : 'Wardrobe'}</li>
                  <li>• {lang === 'TH' ? 'พัดลม' : 'Fan'}</li>
                  {selectedDorm.air === 'ปรับอากาศ' && <li>• {lang === 'TH' ? 'เครื่องปรับอากาศ' : 'Air Conditioner'}</li>}
                  <li>• {lang === 'TH' ? 'ห้องน้ำ' : 'Toilet'}</li>
                  <li>• {lang === 'TH' ? 'เครื่องทำน้ำอุ่น' : 'Water Heater'}</li>
                  <li>• {lang === 'TH' ? 'ที่ล้างจาน' : 'Sink'}</li>
                </ul>
              </div>
              <div className="fac-col">
                <h4 style={{ color: '#1A2B4C', borderBottom: '2px solid #E1EDFF', paddingBottom: '10px', fontSize: '24px', marginTop: '0' }}>{lang === 'TH' ? 'ส่วนรวม' : 'Common Area'}</h4>
                <ul style={{ listStyle: 'none', padding: '0', fontSize: '18px', lineHeight: '2.2', color: '#444' }}>
                  <li>• {lang === 'TH' ? 'ไมโครเวฟ' : 'Microwave'}</li>
                  <li>• {lang === 'TH' ? 'ตู้เย็น' : 'Refrigerator'}</li>
                  <li>• {lang === 'TH' ? 'เครื่องซักผ้า - อบผ้า' : 'Washing Machine'}</li>
                  <li>• {lang === 'TH' ? 'เครื่องกดน้ำ' : 'Water Dispenser'}</li>
                  <li>• {lang === 'TH' ? 'ห้องส่วนกลาง' : 'Common Room'}</li>
                </ul>
              </div>
            </div>

            {/* GPS Location */}
            <div className="gps-section">
              <div className="gps-label" style={{ background: '#1A2B4C', color: 'white', padding: '10px 30px', borderRadius: '10px', display: 'inline-block', fontWeight: 'bold', marginBottom: '15px' }}>GPS Location</div>
              <div className="map-container" style={{ borderRadius: '25px', overflow: 'hidden', border: '2px solid #1A2B4C', margin: '15px 0' }}>
                <iframe title="map" src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedDorm.nameTH + " มหาวิทยาลัยแม่ฟ้าหลวง")}&output=embed`} width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;