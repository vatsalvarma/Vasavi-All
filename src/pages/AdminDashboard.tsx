import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Users, ShoppingBag, Box, Globe, Shield, 
  Settings, Bell, Search, Command, ChevronRight, Menu, Sun, Moon,
  TrendingUp, TrendingDown, DollarSign, Package, Coffee, Truck,
  AlertCircle, CheckCircle2, Server, Database, Cpu, HardDrive
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// --- THEME ---
const COLORS = {
  bg: '#090909',
  card: 'rgba(255,255,255,0.02)',
  border: 'rgba(255,255,255,0.08)',
  accent: '#D4AF37',
  text: '#F5F5F5',
  muted: '#A6A6A6',
};

// --- MOCK DATA ---
const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 5000, profit: 3200 },
  { name: 'Mar', revenue: 6500, profit: 4100 },
  { name: 'Apr', revenue: 8000, profit: 5400 },
  { name: 'May', revenue: 12000, profit: 8900 },
  { name: 'Jun', revenue: 15500, profit: 11000 },
  { name: 'Jul', revenue: 21000, profit: 16000 },
];

const ORIGIN_DATA = [
  { name: 'Ethiopia', value: 400 },
  { name: 'Colombia', value: 300 },
  { name: 'Brazil', value: 300 },
  { name: 'Kenya', value: 200 },
];

const AREA_CHART_OPTION = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(9,9,9,0.9)',
    borderColor: 'rgba(255,255,255,0.1)',
    textStyle: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
  },
  grid: { left: '1%', right: '1%', bottom: '0%', top: '5%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
    axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10, formatter: '${value}' }
  },
  series: [
    {
      name: 'Revenue',
      type: 'line',
      smooth: true,
      showSymbol: false,
      itemStyle: { color: '#D4AF37' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: 'rgba(212,175,55,0.4)' }, { offset: 1, color: 'rgba(212,175,55,0)' }]
        }
      },
      data: [4000, 5000, 6500, 8000, 12000, 15500, 21000]
    },
    {
      name: 'Profit',
      type: 'line',
      smooth: true,
      showSymbol: false,
      itemStyle: { color: '#3b82f6' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0)' }]
        }
      },
      data: [2400, 3200, 4100, 5400, 8900, 11000, 16000]
    }
  ]
};

const PIE_CHART_OPTION = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(9,9,9,0.9)',
    borderColor: 'rgba(255,255,255,0.1)',
    textStyle: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
  },
  series: [
    {
      name: 'Coffee Origins',
      type: 'pie',
      radius: ['60%', '90%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
        borderColor: '#090909',
        borderWidth: 2
      },
      label: { show: false },
      data: [
        { value: 400, name: 'Ethiopia', itemStyle: { color: '#D4AF37' } },
        { value: 300, name: 'Colombia', itemStyle: { color: '#b5952f' } },
        { value: 300, name: 'Brazil', itemStyle: { color: '#876c1c' } },
        { value: 200, name: 'Kenya', itemStyle: { color: '#54420e' } }
      ]
    }
  ]
};

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Alice Cooper', product: 'Ethiopian Yirgacheffe', amount: '$45.00', status: 'Processing', time: '2 mins ago' },
  { id: 'ORD-002', customer: 'Bob Marley', product: 'Niche Zero Grinder', amount: '$699.00', status: 'Shipped', time: '15 mins ago' },
  { id: 'ORD-003', customer: 'Charlie Puth', product: 'Fellow Stagg EKG', amount: '$165.00', status: 'Delivered', time: '1 hr ago' },
  { id: 'ORD-004', customer: 'Diana Prince', product: 'Chemex 8-Cup', amount: '$48.00', status: 'Processing', time: '2 hrs ago' },
  { id: 'ORD-005', customer: 'Bruce Wayne', product: 'Panama Geisha', amount: '$120.00', status: 'Shipped', time: '3 hrs ago' },
];

const CHART_COLORS = ['#D4AF37', '#b5952f', '#876c1c', '#54420e'];

// --- SHARED COMPONENTS ---
const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl relative ${className}`}
  >
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const StatCard = ({ title, value, trend, icon: Icon, delay, prefix = "", suffix = "", dataKey }: any) => {
  const sparklineData = dataKey === 'orders' ? [12, 14, 18, 15, 22, 28, 35] : 
                        dataKey === 'customers' ? [5, 8, 12, 18, 25, 30, 42] :
                        dataKey === 'conversion' ? [2, 2.5, 3.1, 2.8, 3.5, 4.0, 4.2] : 
                        [4000, 5000, 6500, 8000, 12000, 15500, 21000];
  const sparklineColor = trend >= 0 ? '#4ade80' : '#f87171';

  const option = {
    grid: { left: 0, right: 0, bottom: 0, top: 2 },
    xAxis: { type: 'category', show: false, boundaryGap: false, data: sparklineData.map((_, i) => i) },
    yAxis: { type: 'value', show: false, min: 'dataMin' },
    series: [{
      type: 'line',
      data: sparklineData,
      smooth: true,
      showSymbol: false,
      lineStyle: { color: sparklineColor, width: 2 }
    }]
  };

  return (
    <GlassCard delay={delay} className="p-3 flex flex-col justify-between group hover:border-[#D4AF37]/30 transition-colors duration-500 min-h-[100px]">
      <div className="flex justify-between items-start mb-1">
        <div className="p-1.5 bg-black/50 rounded-lg border border-white/5 group-hover:border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/5 transition-colors">
          <Icon className="w-3.5 h-3.5 text-white/70 group-hover:text-[#D4AF37] transition-colors" />
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${trend >= 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </div>
      </div>
      
      <div>
        <h3 className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-0.5">{title}</h3>
        <div className="text-xl font-black text-white flex items-baseline gap-0.5">
          {prefix && <span className="text-sm text-white/50">{prefix}</span>}
          <span>{value.toLocaleString()}</span>
          {suffix && <span className="text-[10px] text-white/50">{suffix}</span>}
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-6 mt-1 -mx-1 -mb-1 opacity-40 group-hover:opacity-100 transition-opacity">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </GlassCard>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  const SIDEBAR_LINKS = [
    { section: 'Dashboard', items: ['Overview', 'Analytics', 'Real-time Sales'] },
    { section: 'Management', items: ['Orders', 'Products', 'Inventory', 'Customers', 'Subscriptions'] },
    { section: 'Marketing', items: ['Campaigns', 'Discounts', 'Affiliates'] },
    { section: 'System', items: ['Settings', 'Audit Logs', 'API', 'Employees'] },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black flex overflow-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      </div>

      {/* --- SIDEBAR --- */}
      <motion.aside 
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="h-screen bg-black/40 backdrop-blur-2xl border-r border-white/5 relative z-20 flex flex-col shrink-0"
      >
        <div className="h-[70px] flex items-center justify-between px-6 border-b border-white/5">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-black" />
                </div>
                <span className="font-black tracking-widest uppercase text-sm">NovaAdmin</span>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-black" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar [&::-webkit-scrollbar]:hidden">
          {SIDEBAR_LINKS.map((group, idx) => (
            <div key={idx} className="mb-4">
              {sidebarOpen && (
                <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 px-2">
                  {group.section}
                </h4>
              )}
              <div className="space-y-0.5">
                {group.items.map((item, i) => {
                  const isActive = activeTab === item;
                  return (
                    <button 
                      key={i}
                      onClick={() => setActiveTab(item)}
                      className={`w-full flex items-center ${sidebarOpen ? 'justify-start px-3' : 'justify-center'} h-8 rounded-lg transition-all group ${isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                      <Box className={`w-3 h-3 ${isActive ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-white'} transition-colors ${sidebarOpen ? 'mr-2' : ''}`} />
                      {sidebarOpen && <span className="text-[10px] font-bold tracking-wide">{item}</span>}
                      {sidebarOpen && isActive && <ChevronRight className="w-2.5 h-2.5 ml-auto opacity-50" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white py-3 rounded-xl transition-colors border border-white/5">
            <Settings className="w-4 h-4" />
            {sidebarOpen && <span className="text-xs font-bold uppercase tracking-widest">Settings</span>}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* TOP NAVBAR */}
        <header className="h-[50px] bg-black/20 backdrop-blur-2xl border-b border-white/5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/50 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-1.5 rounded-full w-[250px]">
              <Search className="w-3.5 h-3.5 text-white/40" />
              <input type="text" placeholder="Search orders, customers, beans..." className="bg-transparent text-[10px] text-white placeholder:text-white/40 outline-none w-full" />
              <div className="flex items-center gap-1 opacity-50">
                <Command className="w-2.5 h-2.5" /> <span className="text-[9px] font-bold">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Systems Operational
            </div>
            
            <div className="w-px h-6 bg-white/10" />
            
            <button className="relative text-white/50 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#090909]" />
            </button>
            
            <div className="flex items-center gap-3 pl-2 cursor-pointer">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold text-white leading-tight">Alex Mercer</div>
                <div className="text-[8px] uppercase tracking-widest text-[#D4AF37]">Super Admin</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD SCROLL AREA */}
        <div className="flex-1 overflow-hidden p-4 flex flex-col">
          <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full gap-3">
            
            {/* Header Area */}
            <div className="flex justify-between items-end shrink-0">
              <div>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-black text-white tracking-tight leading-none mb-1">
                  Command Center
                </motion.h1>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                  Real-time analytics for Nova Coffee
                </motion.p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Export
                </button>
                <button className="px-4 py-2 bg-[#D4AF37] hover:bg-white text-black rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Quick Create
                </button>
              </div>
            </div>

            {/* KPI STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 shrink-0">
              <StatCard title="Total Revenue" value={2145020} prefix="$" trend={14.5} icon={DollarSign} delay={0.1} dataKey="revenue" />
              <StatCard title="Total Orders" value={15243} trend={8.2} icon={ShoppingBag} delay={0.2} dataKey="orders" />
              <StatCard title="Active Customers" value={8492} trend={12.4} icon={Users} delay={0.3} dataKey="customers" />
              <StatCard title="Conversion Rate" value={4.2} suffix="%" trend={-1.2} icon={Activity} delay={0.4} dataKey="conversion" />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[180px] shrink-0">
              
              {/* REVENUE CHART */}
              <GlassCard delay={0.5} className="lg:col-span-2 p-3 flex flex-col h-full">
                <div className="flex justify-between items-center mb-2 shrink-0">
                  <div>
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Revenue Overview</h3>
                  </div>
                  <select className="bg-black/50 border border-white/10 rounded px-2 py-1 text-[9px] text-white outline-none">
                    <option>This Year</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="flex-1 w-full relative">
                  <ReactECharts option={AREA_CHART_OPTION} style={{ height: '100%', width: '100%' }} />
                </div>
              </GlassCard>

              {/* SALES BY ORIGIN */}
              <GlassCard delay={0.6} className="p-3 flex flex-col h-full">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-1 shrink-0">Coffee Origins</h3>
                <div className="flex-1 w-full relative flex items-center justify-center">
                  <ReactECharts option={PIE_CHART_OPTION} style={{ height: '100%', width: '100%' }} />
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-black text-white leading-none">1.2k</span>
                    <span className="text-[7px] font-bold uppercase tracking-widest text-white/40">Bags Sold</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1 shrink-0">
                  {ORIGIN_DATA.map((data, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-[9px] font-bold text-white/70">{data.name}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* LOWER ROW: RECENT ORDERS & SYSTEM HEALTH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
              
              {/* RECENT ORDERS */}
              <GlassCard delay={0.7} className="lg:col-span-2 p-0 overflow-hidden flex flex-col h-full">
                <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/[0.01] shrink-0">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D4AF37]" /> Live Order Stream
                  </h3>
                  <button className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors">
                    View All
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#090909] z-10">
                      <tr className="bg-black/20 text-[8px] font-bold uppercase tracking-widest text-white/40 border-b border-white/5">
                        <th className="p-2 pl-4">Order ID</th>
                        <th className="p-2">Customer</th>
                        <th className="p-2">Product</th>
                        <th className="p-2">Status</th>
                        <th className="p-2 text-right pr-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_ORDERS.map((order, i) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                          <td className="p-2 pl-4 text-[10px] font-mono text-white/70">{order.id}</td>
                          <td className="p-2 text-[10px] font-bold text-white group-hover:text-[#D4AF37] transition-colors">{order.customer}</td>
                          <td className="p-2 text-[9px] text-white/70">{order.product}</td>
                          <td className="p-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border ${
                              order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                              order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                              'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-2 pr-4 text-[10px] font-black text-white text-right">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              {/* SYSTEM HEALTH */}
              <GlassCard delay={0.8} className="p-3 flex flex-col h-full overflow-hidden">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5 shrink-0">
                  <Server className="w-3.5 h-3.5 text-blue-400" /> System Health
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
                  {/* CPU */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/60">
                        <Cpu className="w-3 h-3" /> API Server CPU
                      </div>
                      <span className="text-[10px] font-black text-white">42%</span>
                    </div>
                    <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-blue-400 w-[42%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>

                  {/* RAM */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/60">
                        <HardDrive className="w-3 h-3" /> Memory Usage
                      </div>
                      <span className="text-[10px] font-black text-white">78%</span>
                    </div>
                    <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-[#D4AF37] w-[78%] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </div>
                  </div>

                  {/* DB */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/60">
                        <Database className="w-3 h-3" /> Database Load
                      </div>
                      <span className="text-[10px] font-black text-white">12%</span>
                    </div>
                    <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-green-400 w-[12%] shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    </div>
                  </div>

                  <div className="mt-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 flex gap-2 items-start shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <div>
                      <h4 className="text-[9px] font-bold text-red-400 uppercase tracking-widest mb-0.5">Failed Payments (3)</h4>
                      <p className="text-[8px] text-red-400/70 leading-tight">3 Stripe webhooks failed in the last hour. Requires attention.</p>
                    </div>
                  </div>
                </div>

              </GlassCard>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
