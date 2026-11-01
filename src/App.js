import React, { useState, useEffect } from 'react';
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
  const [visitorCount, setVisitorCount] = useState(128);

  // ระบบนับคนเข้าชมผ่าน localStorage แสดงตัวเลขอัตโนมัติ ไม่ต้องพึ่งพา iframe ภายนอก
  useEffect(() => {
    const savedCount = localStorage.getItem('mfu_dorm_visitors');
    let current = savedCount ? parseInt(savedCount, 10) : 128;
    current += 1;
    localStorage.setItem('mfu_dorm_visitors', current.toString());
    setVisitorCount(current);
  }, []);

  // ข้อมูลหอพักพร้อมสิ่งอำนวยความสะดวกตามข้อมูลบันทึกจริง
  const dorms = [
    {
      id: 1, dormCode: "L1", nameTH: "หอพักลำดวน 1", nameEN: "Lamduan 1", type: "ชาย", air: "ปรับอากาศ", cap: "4 คน",
      gps: "https://maps.app.goo.gl/FMvNZ9VAhdbZoBBn7", videoUrl: "onxi-2KijdQ", videoUrl2: "tRB24cF1oDs", image: "/l1.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น"],
        roomEN: ["Air Conditioner", "En-suite Bathroom", "Sink", "Water Heater"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 9 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 9, 2026",
      isRenovating: true,
    },
    {
      id: 2, dormCode: "L2", nameTH: "หอพักลำดวน 2", nameEN: "Lamduan 2", type: "ชาย", air: "พัดลม", cap: "4 คน",
      gps: "", videoUrl: "U0774-iGnnA", videoUrl2: "h5RCO6fUkbI", image: "/l2.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 9 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 9, 2026"
    },
    {
      id: 3, dormCode: "L3", nameTH: "หอพักลำดวน 3", nameEN: "Lamduan 3", type: "ชาย", air: "ปรับอากาศ", cap: "4 คน",
      gps: "https://maps.app.goo.gl/w7Pd9LGRBPyakJ5S9", videoUrl: "RDUvNuKtZhk", videoUrl2: "-jpNNhB5ag0", image: "/l3.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 9 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 9, 2026"
    },
    {
      id: 4, dormCode: "L4", nameTH: "หอพักลำดวน 4", nameEN: "Lamduan 4", type: "ชาย", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/mFb1v18Xo8N6Bkqe6", videoUrl: "mqth2CEH_08", videoUrl2: "rKp74BxREFo", image: "/l4.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ตู้แลกเหรียญ", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine","Coin Exchange Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 10 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 10, 2026"
    },
    {
      id: 5, dormCode: "L5", nameTH: "หอพักลำดวน 5", nameEN: "Lamduan 5", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/WJBTMbxnZBFoPxn78", videoUrl: "5baFRJY1Xwo", videoUrl2: "dyzYdYuosWQ", image: "/l5.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 10 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 10, 2026"
    },
    {
      id: 6, dormCode: "L6", nameTH: "หอพักลำดวน 6", nameEN: "Lamduan 6", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/d2esT7tLTb2FdAKV9", videoUrl: "A4aly0kzns0", videoUrl2: "PpcxRSzWpVk", image: "/l6.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 10 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 10, 2026"
    },
    {
      id: 7, dormCode: "L7", nameTH: "หอพักลำดวน 7", nameEN: "Lamduan 7", type: "หญิง", air: "ปรับอากาศ", cap: "4 คน",
      gps: "https://maps.app.goo.gl/cJP3Gh92MPNBKdjD7", videoUrl: "2jqZgOwvo6k", videoUrl2: "96DCN6Bl4FM", image: "/l7.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "ตู้เย็นมินิ", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Mini Refrigerator", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า", "ตู้แลกเหรียญ", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washing Machine", "Coin Exchange Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 10 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 10, 2026"
    },
    {
      id: 8, dormCode: "F1", nameTH: "หอพัก F1", nameEN: "Dorm F1", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/JY7VbfxykiiCSgaM9", videoUrl: "c0kNdJ4M3hQ", videoUrl2: "NARR8GP5Tws", image: "/f1.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ห้องน้ำส่วนรวม", "ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ห้องกลาง"],
        commonEN: ["Shared Bathroom", "Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Common Hall"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 13 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 13, 2026"
    },
    {
      id: 9, dormCode: "F2", nameTH: "หอพัก F2", nameEN: "Dorm F2", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/REtk2znMin5zwpj99", videoUrl: "MjxCOP3lmIs", videoUrl2: "mLzh9RE9Xmo", image: "/f2.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "เตียงเดี่ยว", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "Single Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ห้องน้ำส่วนรวม", "ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ตู้แลกเหรียญ", "ห้องกลาง"],
        commonEN: ["Shared Bathroom", "Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Coin Exchange Machine", "Common Hall"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 13 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 13, 2026"
    },
    {
      id: 10, dormCode: "F3", nameTH: "หอพัก F3", nameEN: "Dorm F3", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/ZLCvWtj1sYQbJzot9", videoUrl: "SXk1oxk-eBQ", image: "/f3.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน"],
        roomEN: ["Ceiling Fan"],
        commonTH: ["ห้องน้ำส่วนรวม"],
        commonEN: ["Shared Bathroom"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 13 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 13, 2026",
      isRenovating: true,
    },
    {
      id: 11, dormCode: "F4", nameTH: "หอพัก F4", nameEN: "Dorm F4", type: "ชาย", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/AdxsmwS6mw7bB4NUA", videoUrl: "oq3E9-j4kfc", videoUrl2: "Y8Db2meTE6c", image: "/f4.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ห้องน้ำส่วนรวม", "ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ห้องกลาง"],
        commonEN: ["Shared Bathroom", "Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Common Hall"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 14 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 14, 2026"
    },
    {
      id: 12, dormCode: "F5", nameTH: "หอพัก F5", nameEN: "Dorm F5", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/2Scm791aSiEKYUQb6", videoUrl: "f2r18_M8rNc", videoUrl2: "xjmrigNhRFg", image: "/f5.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ห้องน้ำส่วนรวม", "ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ห้องกลาง"],
        commonEN: ["Shared Bathroom", "Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Common Hall"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 14 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 14, 2026"
    },
    {
      id: 13, dormCode: "F6", nameTH: "หอพัก F6", nameEN: "Dorm F6", type: "หญิง", air: "พัดลม", cap: "4 คน",
      gps: "https://maps.app.goo.gl/eLWD815Zwmxmvx88A", videoUrl: "QLT593RLYIM", videoUrl2: "FgBObt4vh9U", image: "/f6.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["พัดลมเพดาน", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Ceiling Fan", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ห้องน้ำส่วนรวม", "ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ห้องกลาง"],
        commonEN: ["Shared Bathroom", "Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Common Hall"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 14 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 14, 2026"
    },
    {
      id: 14, dormCode: "SK1", nameTH: "หอพักสักทอง 1", nameEN: "Sakthong 1", type: "หญิง", air: "ปรับอากาศ", cap: "4 คน",
      gps: "https://maps.app.goo.gl/yu5DyqudiV6zqbJs6", videoUrl: "Xu_QmW2lXcw", videoUrl2: "U12NJpxBzT4", image: "/sk1.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: { 
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ตู้แลกเหรียญ", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Coin Exchange Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 12 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 12, 2026"
    },
    {
      id: 15, dormCode: "SK2", nameTH: "หอพักสักทอง 2", nameEN: "Sakthong 2", type: "หญิง", air: "ปรับอากาศ", cap: "4 คน",
      gps: "https://maps.app.goo.gl/xxxx19", videoUrl: "dszora_-0Wg", videoUrl2: "rAEDVBqgdu4", image: "/sk2.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียง 2 ชั้น", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Bunk Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ตู้แลกเหรียญ", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Coin Exchange Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 12 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 12, 2026"
    },
    {
      id: 16, dormCode: "SK3", nameTH: "หอพักสักทอง 3", nameEN: "Sakthong 3", type: "หญิง", air: "ปรับอากาศ", cap: "2 คน",
      gps: "https://maps.app.goo.gl/YdtoPXqvVmdLK4ev5", videoUrl: "I-uhTU7PTm8", videoUrl2: "MocYMMlS5Pk", image: "/sk3.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียงเดี่ยว", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Single Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ตู้แลกเหรียญ", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Coin Exchange Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 12 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 12, 2026"
    },
    {
      id: 17, dormCode: "BOON", nameTH: "หอพักบุญทรง", nameEN: "Boonsong", type: "หญิง", air: "ปรับอากาศ", cap: "3 คน",
      gps: "https://maps.app.goo.gl/eLWD815Zwmxmvx88A", videoUrl: "yqCklVcqPzA", videoUrl2: "gKcH6lH7rak", image: "/bs.jpeg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียงเดี่ยว", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Single Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 11 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 11, 2026"
    },
    {
      id: 18, dormCode: "PRA", nameTH: "หอพักประเสริฐ", nameEN: "Prasert", type: "หญิง", air: "ปรับอากาศ", cap: "2 คน",
      gps: "https://maps.app.goo.gl/oc9qWcV6rpBwW2Fs6", videoUrl: "Er_K5N5Z7iA", videoUrl2: "c02xz-Yspk4", image: "/ps.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียงเดี่ยว", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Single Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 11 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 11, 2026"
    },
    {
      id: 19, dormCode: "POL", nameTH: "หอพักพล.ต.อ.เภาฯ", nameEN: "Pol.Gen.Phao", type: "หญิง", air: "ปรับอากาศ", cap: "2 คน",
      gps: "https://maps.app.goo.gl/xxxx23", videoUrl: "n-s7901qyx0", videoUrl2: "lnbXzKeRpHs", image: "/nana.jpg",
      tour360Url: "/testf1-2/index.html",
      facilities: {
        roomTH: ["เครื่องปรับอากาศ (Air)", "พัดลมเพดาน", "ห้องน้ำในตัว", "ซิงค์ล้างจาน", "เครื่องทำน้ำอุ่น", "เตียงเดี่ยว", "โต๊ะ-เก้าอี้", "ตู้เสื้อผ้า"],
        roomEN: ["Air Conditioner", "Ceiling Fan", "En-suite Bathroom", "Sink", "Water Heater", "Single Bed", "Desk & Chair", "Wardrobe"],
        commonTH: ["ตู้เย็น", "ตู้กดน้ำ", "ไมโครเวฟ", "เครื่องซักผ้า-อบผ้า", "ตู้แลกเหรียญ", "ห้องส่วนกลาง"],
        commonEN: ["Refrigerator", "Water Dispenser", "Microwave", "Washer & Dryer", "Coin Exchange Machine", "Common Room"]
      },
      noteTH: "ข้อมูล & ถ่ายเมื่อวันที่ 11 พฤษภาคม 2569",
      noteEN: "Data & recorded on May 11, 2026"
    }
  ];

  // ฟังก์ชันส่งคำสั่งเข้าไปใน Unity iframe
  const sendToUnity = (message) => {
    const iframe = document.getElementById("unity-iframe");
    if (!iframe || !iframe.contentWindow) {
      console.warn("Unity iframe ยังไม่พร้อมส่งคำสั่ง:", message);
      return;
    }
    iframe.contentWindow.postMessage({ type: "TO_UNITY", payload: message }, "*");
    console.log("📤 React ส่งไป Unity:", message);
  };

  window.sendToUnity = sendToUnity;

  // 1. ดึงหน้าจอกลับขึ้นบนสุดทันทีเมื่อมีการกดเลือกหอพัก
  useEffect(() => {
    if (selectedDorm) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [selectedDorm]);

  // 2. จัดการส่งคำสั่งเปลี่ยนห้องเมื่อสลับหอพักในโหมด 360
  useEffect(() => {
    if (selectedDorm && selectedDorm.dormCode && viewMode === '360') {
      const timer = setTimeout(() => {
        sendToUnity(selectedDorm.dormCode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedDorm, viewMode]);

  // 3. ดักฟังสัญญาณตอบกลับและสัญญาณพร้อมทำงานจาก Unity (UNITY_READY)
  useEffect(() => {
    const handleUnityMessage = (event) => {
      if (event.data && event.data.type === "UNITY_READY") {
        console.log("⚡ Unity ส่งสัญญาณพร้อมทำงานแล้ว!");
        if (selectedDorm && selectedDorm.dormCode) {
          sendToUnity(selectedDorm.dormCode);
        }
        return;
      }

      const msg = event.data?.payload || event.detail;
      if (!msg || typeof msg !== "string") return;

      console.log("📥 Unity ส่งกลับมา:", msg);
      if (msg === "PONG") console.log("✅ เชื่อมต่อ Unity สำเร็จ");
      if (msg.startsWith("RECEIVED:")) console.log(`✅ Unity รับคำสั่ง ${msg.replace("RECEIVED:", "")} แล้ว`);
    };

    window.addEventListener("message", handleUnityMessage);
    return () => window.removeEventListener("message", handleUnityMessage);
  }, [selectedDorm]);

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
        <div className="logo-section" onClick={() => { setSelectedDorm(null); setFilters([]); setViewMode('360'); }} style={{ cursor: 'pointer' }}>
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

      {/* Side Menu Drawer */}
      <div 
        className={`side-menu ${isMenuOpen ? 'open' : ''}`}
        style={{
          overflowY: 'auto',
          maxHeight: '100vh',
          padding: '24px 20px',
          boxSizing: 'border-box',
          textAlign: 'left'
        }}
      >
        <div className="close-btn" onClick={() => setIsMenuOpen(false)} style={{ cursor: 'pointer', fontSize: '28px', textAlign: 'right', marginBottom: '10px' }}>×</div>
        
        {/* 1. ข้อมูลและช่องทางติดต่อ ส่วนพัฒนานักศึกษา */}
        <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <img src="/logo.png" alt="MFU Logo" style={{ width: '38px', height: 'auto' }} />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1A2B4C', lineHeight: '1.3' }}>
                {lang === 'TH' ? 'ส่วนพัฒนานักศึกษา มหาวิทยาลัยแม่ฟ้าหลวง' : 'Student Development Affairs Division'}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Mae Fah Luang University</div>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.6', background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 4px' }}>
              <strong>{lang === 'TH' ? 'ที่อยู่:' : 'Address:'}</strong> อาคารโรงอาหาร D1 333 หมู่ 1 ต.ท่าสุด อ.เมือง จ.เชียงราย 57100
            </p>
            <p style={{ margin: '0 0 6px', color: '#64748B' }}>
              D1 Building 333 Moo 1, Thasud, Muang, Chiang Rai 57100
            </p>
            <p style={{ margin: '0 0 4px' }}>
              <strong>ส่วนพัฒนานักศึกษา มฟล. SDAD MFU</strong>
            </p>
            <p style={{ margin: '0 0 4px' }}>
              📧 Email: <a href="mailto:sdad@mfu.ac.th" style={{ color: '#2563EB', textDecoration: 'none' }}>sdad@mfu.ac.th</a>
            </p>
            <p style={{ margin: 0 }}>
              📞 โทรศัพท์: <a href="tel:053916376" style={{ color: '#2563EB', textDecoration: 'none' }}>053-916376</a>
            </p>
          </div>
        </div>

        {/* 2. Important Notice */}
        <div style={{ 
          background: '#FEF2F2', 
          borderLeft: '4px solid #DC2626', 
          padding: '10px 12px', 
          borderRadius: '6px', 
          marginBottom: '16px',
          color: '#991B1B',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          📌 Important: Information as of November 2, 2026
        </div>

        {/* 3. Version */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ 
            display: 'inline-block',
            fontWeight: '900', 
            fontSize: '15px', 
            color: '#1E293B',
            background: '#F1F5F9',
            padding: '4px 10px',
            borderRadius: '6px'
          }}>
            Version 1
          </span>
        </div>

        {/* 4. ข้อมูลผู้พัฒนา (แบบที่ 1: Technical & Professional) */}
        <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '18px', marginBottom: '18px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#1A2B4C', fontWeight: 'bold' }}>
            {lang === 'TH' ? 'ผู้พัฒนา (Developers)' : 'Developers'}
          </h4>
          
          {/* คนที่ 1: โมจิ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <img 
              src="/Moji.jpg" 
              alt="Moji" 
              style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #CBD5E1' }} 
            />
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
              <div style={{ fontWeight: 'bold', color: '#0F172A' }}>Miss Vichayaphorn Suwannachuen</div>
              <div style={{ color: '#334155' }}>นางสาว วิชญาพร สุวรรณชื่น</div>
              <div style={{ color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>
                Web Application Developer
              </div>
            </div>
          </div>

          {/* คนที่ 2: หยก */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/Yok.jpg" 
              alt="Yok" 
              onError={(e) => { e.target.src = '/cover.jpg'; }}
              style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #CBD5E1' }} 
            />
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
              <div style={{ fontWeight: 'bold', color: '#0F172A' }}>Miss Wachiraya Sitthikasemkit</div>
              <div style={{ color: '#334155' }}>นางสาว วชิรญาณ์ สิทธิเกษมกิจ</div>
              <div style={{ color: '#2563EB', fontWeight: '600', marginTop: '2px' }}>
                360° Virtual Tour & Unity Developer
              </div>
            </div>
          </div>
        </div>

        {/* 5. ชื่ออาจารย์ที่ปรึกษา */}
        <div>
          <h4 style={{ margin: '0 0 10px', fontSize: '15px', color: '#1A2B4C', fontWeight: 'bold' }}>
            ⭐ {lang === 'TH' ? 'ชื่ออาจารย์ที่ปรึกษา' : 'Advisors'}
          </h4>
          <div style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>
            <div style={{ marginBottom: '10px', background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '600', color: '#0F172A' }}>1. ผู้ช่วยศาสตราจารย์ ดร.ศุภกานต์ จันทร์เสรีวิทยา</div>
              <div style={{ color: '#64748B' }}>Asst. Prof. Suppakarn Chansareewittaya, Ph.D.</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '600', color: '#0F172A' }}>2. อาจารย์ ดร.เขมชาติ เขมวุฒมานนท์</div>
              <div style={{ color: '#64748B' }}>Kemachat Kemavuthanon, Ph.D.</div>
            </div>
          </div>
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
                    <p>
                      {lang === 'TH' ? dorm.type : (dorm.type === 'ชาย' ? 'Male' : 'Female')} |{' '}
                      {lang === 'TH' ? dorm.air : (dorm.air === 'ปรับอากาศ' ? 'Air Con' : 'Fan')} |{' '}
                      {lang === 'TH' ? dorm.cap : dorm.cap.replace('คน', 'Persons')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="detail-page">
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
                justifyContent: 'center', 
                gap: '30px', 
                margin: '0 auto 25px', 
                width: '100%', 
                maxWidth: selectedDorm.videoUrl2 ? '1200px' : '750px' 
              }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ background: '#1A2B4C', color: '#FFFFFF', padding: '12px 20px', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {lang === 'TH' ? 'หน้าตึก → หน้าห้อง' : 'Building → Door'}
                  </div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedDorm.videoUrl}`} title="YouTube video 1" frameBorder="0" allowFullScreen style={{ border: 'none', display: 'block' }}></iframe>
                  </div>
                </div>

                {selectedDorm.videoUrl2 && (
                  <div style={{ flex: '1', textAlign: 'center' }}>
                    <div style={{ background: '#1A2B4C', color: '#FFFFFF', padding: '12px 20px', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                      {lang === 'TH' ? 'หน้าห้อง → ในห้อง' : 'Door → Inside'}
                    </div>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedDorm.videoUrl2}`} title="YouTube video 2" frameBorder="0" allowFullScreen style={{ border: 'none', display: 'block' }}></iframe>
                    </div>
                  </div>
                )}
              </div>
            ) : selectedDorm.tour360Url ? (
              <div className="tour-360-wrapper" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 25px', borderRadius: '24px', overflow: 'hidden', border: '3px solid #1A2B4C', boxShadow: '0 12px 35px rgba(0,0,0,0.2)', background: '#000' }}>
                <iframe 
                  key={`${selectedDorm.dormCode}-${selectedDorm.tour360Url}`}
                  id="unity-iframe" 
                  title="Unity 360 Virtual Tour" 
                  src={`${selectedDorm.tour360Url}?dorm=${selectedDorm.dormCode}&v=202611`} 
                  style={{ width: '100%', height: '700px', border: 'none', display: 'block', overflow: 'hidden' }} 
                  allowFullScreen 
                />
              </div>
            ) : (
              <div className="room-frame" style={{ maxWidth: '850px', margin: '0 auto 25px' }}>
                <img src={selectedDorm.image || "/cover.jpg"} alt="Room" className="room-img" style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '20px' }} />
              </div>
            )}

            {/* กล่องสำคัญและคำแนะนำการใช้งาน */}
            {selectedDorm.noteTH && (
              <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto 20px', 
                padding: '12px 20px', 
                background: '#FFF5F5', 
                borderLeft: '5px solid #E53E3E', 
                borderRadius: '10px', 
                color: '#C53030', 
                fontSize: '15px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)', 
                textAlign: 'left' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span>
                    📌 <strong style={{ WebkitTextStroke: '0.6px #C53030', fontWeight: 'bold' }}>
                      {lang === 'TH' ? 'สำคัญ:' : 'Important:'}
                    </strong> {lang === 'TH' ? selectedDorm.noteTH : selectedDorm.noteEN}
                  </span>

                  {selectedDorm.isRenovating && (
                    <span style={{ 
                      backgroundColor: '#E53E3E', 
                      color: '#000000', 
                      padding: '3px 12px', 
                      borderRadius: '20px', 
                      fontSize: '13px', 
                      fontWeight: 'bold', 
                      display: 'inline-block', 
                      boxShadow: '0 2px 6px rgba(229, 62, 62, 0.3)' 
                    }}>
                      ⚠️ {lang === 'TH' ? 'อยู่ระหว่างรีโนเวท' : 'Under Renovation'}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: '6px', fontSize: '13px', color: '#b91c1c', fontWeight: '500' }}>
                  {lang === 'TH' ? (
                    <>
                      * <strong>สำหรับอุปกรณ์หน้าจอสัมผัส (Touchscreen):</strong> ให้ใช้ <strong>2 นิ้ว</strong> ในการเลื่อนหมุนชมภาพ 360 องศา
                    </>
                  ) : (
                    <>
                      * <strong>For Touchscreen Devices:</strong> Use <strong>two fingers</strong> to drag and explore the 360° view
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 2. ปุ่มสลับสื่อ 2 ปุ่ม */}
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

            {/* 3. แถบฟิลเตอร์ 8 ปุ่ม */}
            <div className="filter-bar" style={{ margin: '15px 0 20px', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {filterNames[lang].map((btn, i) => {
                const val = filterNames['TH'][i];
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

            {/* 4. แถบการ์ดเลือกหอพักอื่นๆ ตามฟิลเตอร์ */}
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

            {/* 5. สิ่งอำนวยความสะดวก */}
            <div className="fac-tag" style={{ background: '#1A2B4C', color: 'white', padding: '12px 35px', borderRadius: '12px', display: 'inline-block', fontSize: '22px', marginBottom: '25px', fontWeight: '600' }}>
              {lang === 'TH' ? 'สิ่งอำนวยความสะดวก' : 'Facilities'}
            </div>
            
            <div className="fac-box-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', border: '2px solid #E1EDFF', borderRadius: '30px', padding: '40px', marginBottom: '25px', background: '#fcfcfc' }}>
              <div className="fac-col">
                <h4 style={{ color: '#1A2B4C', borderBottom: '2px solid #E1EDFF', paddingBottom: '10px', fontSize: '24px', marginTop: '0' }}>
                  {lang === 'TH' ? 'ภายในห้อง (ส่วนตัว)' : 'In Room (Private)'}
                </h4>
                <ul style={{ listStyle: 'none', padding: '0', fontSize: '18px', lineHeight: '2.2', color: '#444' }}>
                  {selectedDorm.facilities && (lang === 'TH' ? selectedDorm.facilities.roomTH : selectedDorm.facilities.roomEN)?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="fac-col">
                <h4 style={{ color: '#1A2B4C', borderBottom: '2px solid #E1EDFF', paddingBottom: '10px', fontSize: '24px', marginTop: '0' }}>
                  {lang === 'TH' ? 'ส่วนรวม' : 'Common Area'}
                </h4>
                <ul style={{ listStyle: 'none', padding: '0', fontSize: '18px', lineHeight: '2.2', color: '#444' }}>
                  {selectedDorm.facilities && (lang === 'TH' ? selectedDorm.facilities.commonTH : selectedDorm.facilities.commonEN)?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. GPS Location */}
            <div className="gps-section">
              <div className="gps-label" style={{ background: '#1A2B4C', color: 'white', padding: '10px 30px', borderRadius: '10px', display: 'inline-block', fontWeight: 'bold', marginBottom: '15px' }}>GPS Location</div>
              <div className="map-container" style={{ borderRadius: '25px', overflow: 'hidden', border: '2px solid #1A2B4C', margin: '15px 0' }}>
                <iframe 
                  title="map" 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedDorm.nameTH + " มหาวิทยาลัยแม่ฟ้าหลวง")}&output=embed`} 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  tabIndex="-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer สถิติผู้เข้าชมและวันที่ (ลอยติดขอบล่างตลอดเวลาทุกหน้า) */}
      <footer className="mfu-fixed-bottom-bar">
        <div className="mfu-stats-card">
          <div className="stat-badge-group">
            <span className="stat-icon-gold">📅</span>
            <span className="stat-title-gold">{lang === 'TH' ? 'วันที่:' : 'Date:'}</span>
            <span className="stat-value-gold">
              {new Date().toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="stat-separator-gold"></div>

          <div className="stat-badge-group">
            <span className="stat-icon-gold">👥</span>
            <span className="stat-title-gold">{lang === 'TH' ? 'ผู้เข้าชมเว็บไซต์:' : 'Visitors:'}</span>
            <span style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.35)', 
              color: '#FFD700', 
              padding: '2px 8px', 
              borderRadius: '6px', 
              fontFamily: 'monospace', 
              fontSize: '14px', 
              fontWeight: 'bold',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              letterSpacing: '1px'
            }}>
              {visitorCount.toLocaleString()} {lang === 'TH' ? 'คน' : ''}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;