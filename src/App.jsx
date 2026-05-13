import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Users, Lock, Unlock, Bell, BarChart3, ShieldCheck, Cloud, Smartphone,
  ChevronRight, Eye, Power, Building2, Settings, Home, Fingerprint, Wifi,
  CalendarDays, PlayCircle, TrendingUp, Zap
} from "lucide-react";

const branches = ["Merkez Şube", "Kordon Cafe", "Turgutlu Depo"];

const cameraFeeds = [
  { name: "Ana Salon", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80" },
  { name: "Kasa Alanı", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80" },
  { name: "Giriş Kapısı", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80" },
];

const notifications = [
  { icon: Camera, title: "Kamera Uyarısı", text: "Ön kapıda hareket algılandı.", time: "Şimdi" },
  { icon: Users, title: "Personel Girişi", text: "Mehmet Demir 08:28’de giriş yaptı.", time: "2 dk" },
  { icon: BarChart3, title: "Satış Raporu", text: "Ciro hedefin %12 üstünde ilerliyor.", time: "8 dk" },
  { icon: Lock, title: "Kapı Durumu", text: "Depo kapısı kilitli durumda.", time: "12 dk" },
];

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function MiniMetric({ icon: Icon, title, value, sub }) {
  return (
    <Card className="metric">
      <div className="metricTop"><span>{title}</span><Icon size={20} /></div>
      <strong>{value}</strong>
      <small>{sub}</small>
    </Card>
  );
}

function LineChartFake() {
  return (
    <svg viewBox="0 0 320 110" className="chart">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0067ff" stopOpacity=".35"/><stop offset="100%" stopColor="#0067ff" stopOpacity="0"/></linearGradient></defs>
      <path d="M10 90 L45 76 L72 82 L105 55 L132 64 L160 39 L190 47 L215 24 L242 45 L276 29 L310 14" fill="none" stroke="#0067ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 90 L45 76 L72 82 L105 55 L132 64 L160 39 L190 47 L215 24 L242 45 L276 29 L310 14 L310 110 L10 110 Z" fill="url(#g)"/>
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("panel");
  const [branch, setBranch] = useState(branches[0]);
  const [doorLocked, setDoorLocked] = useState(true);
  const [logged, setLogged] = useState(false);
  const [boot, setBoot] = useState(true);
  const today = useMemo(() => new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" }), []);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className={activeTab === id ? "active" : ""}><Icon size={20}/>{label}</button>
  );

  if (boot) return (
    <div className="screen center">
      <div className="glow"></div>
      <motion.div initial={{scale:.92, opacity:0}} animate={{scale:1, opacity:1}} className="splash">
        <div className="logoMark">D</div>
        <h1>douyazılım</h1>
        <p>Mobil Yönetim Sistemi</p>
        <button className="primary" onClick={() => setBoot(false)}>Demo Başlat</button>
      </motion.div>
    </div>
  );

  if (!logged) return (
    <div className="screen login">
      <div className="brand"><div className="smallLogo">D</div>douyazılım</div>
      <h1>İşletmeniz <span>Cebinizde.</span></h1>
      <p className="lead">Kamera, personel, satış ve geçiş kontrollerini tek panelden yönetin.</p>
      <Card className="loginCard">
        <div className="input">erdoğan@douyazilim.com</div>
        <div className="input">••••••••••</div>
        <button className="primary full" onClick={() => setLogged(true)}><Fingerprint size={20}/>Güvenli Giriş Yap</button>
      </Card>
    </div>
  );

  const renderPanel = () => (
    <>
      <section className="hero"><p>Merhaba, Erdoğan Girgin</p><h1>İşletmeniz <span>Cebinizde.</span></h1></section>
      <Card className="branch">
        <div><Building2 size={21}/></div>
        <section><small>Aktif İşletme</small><select value={branch} onChange={(e)=>setBranch(e.target.value)}>{branches.map(b=><option key={b}>{b}</option>)}</select></section>
        <em>{today}</em>
      </Card>
      <div className="grid2"><MiniMetric icon={BarChart3} title="Günlük Ciro" value="₺245.430" sub="+%12.5 artış"/><MiniMetric icon={Users} title="Personel" value="18/22" sub="Bugün giriş yaptı"/></div>
      <Card className="cameraCard">
        <header><div><b>Canlı Kamera</b><p>Kameralarınızı anlık izleyin.</p></div><button onClick={()=>setActiveTab("kamera")}>Tümünü Gör <ChevronRight size={15}/></button></header>
        <div className="cameraImage"><img src={cameraFeeds[0].img}/><span>● CANLI</span><strong><Eye size={16}/> Ana Salon</strong></div>
      </Card>
      <Card className="door">
        <header><div><b>Geçiş Kontrol</b><p>Kapı ve kilitleri uzaktan yönetin.</p></div>{doorLocked ? <Lock/> : <Unlock/>}</header>
        <button onClick={()=>setDoorLocked(!doorLocked)}><section><b>Depo Kapısı</b><small>{doorLocked ? "Kilitli" : "Kilit Açık"}</small></section><Power/></button>
      </Card>
    </>
  );

  const renderCamera = () => <><h2>Canlı Kamera</h2><div className="stack">{cameraFeeds.map(c=><Card className="camList" key={c.name}><img src={c.img}/><span>● CANLI</span><button><PlayCircle size={24}/></button><strong>{c.name}<small>1080p • Gece görüş aktif</small></strong></Card>)}</div></>;
  const renderReport = () => <><h2>Satış Raporu</h2><Card className="report"><header><section><small>Bugünkü Ciro</small><h3>₺245.430</h3><p>+%12.5 hedef üstü</p></section><TrendingUp size={36}/></header><LineChartFake/></Card><div className="grid2"><MiniMetric icon={CalendarDays} title="Aylık" value="₺2.18M" sub="+%8.4"/><MiniMetric icon={Zap} title="Sipariş" value="1.248" sub="+%5.1"/></div></>;
  const renderNotify = () => <><h2>Bildirimler</h2><div className="stack">{notifications.map((n,i)=>{const Icon=n.icon;return <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*.05}} key={n.title}><Card className="notify"><div><Icon size={20}/></div><section><b>{n.title}</b><p>{n.text}</p></section><small>{n.time}</small></Card></motion.div>})}</div></>;
  const renderSettings = () => <><h2>Ayarlar</h2><Card className="profile"><div>D</div><section><b>Erdoğan Girgin</b><p>Yönetici Hesabı</p></section></Card><Card className="row"><span>Bağlantı Durumu</span><b><Wifi size={16}/>Aktif</b></Card><Card className="row"><span>Yetki Seviyesi</span><b>Tam Yetki</b></Card></>;

  return (
    <div className="app">
      <main>
        <header className="top"><div className="brand"><div className="smallLogo">D</div>douyazılım</div><button onClick={()=>setActiveTab("bildirim")}><Bell size={20}/><i/></button></header>
        <AnimatePresence mode="wait"><motion.div key={activeTab} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}}>
          {activeTab==="panel"&&renderPanel()}{activeTab==="kamera"&&renderCamera()}{activeTab==="rapor"&&renderReport()}{activeTab==="bildirim"&&renderNotify()}{activeTab==="ayar"&&renderSettings()}
        </motion.div></AnimatePresence>
      </main>
      <nav><TabButton id="panel" icon={Home} label="Panel"/><TabButton id="kamera" icon={Camera} label="Kamera"/><TabButton id="rapor" icon={BarChart3} label="Rapor"/><TabButton id="bildirim" icon={Bell} label="Bildirim"/><TabButton id="ayar" icon={Settings} label="Ayar"/></nav>
    </div>
  );
}
