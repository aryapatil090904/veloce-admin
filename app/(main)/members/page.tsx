import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableToolbar,
  TablePagination
} from "@/components/ui/table";
import Link from "next/link";

export default function MembersPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tight leading-none mb-2">Member Directory</h2>
          <p className="text-on-surface-variant font-label text-lg">2,842 Active Members across all regions</p>
        </div>
        <div className="flex gap-3">
          <Link href="/onboarding" className="px-6 py-3 bg-secondary text-on-secondary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(184,255,0,0.3)] transition-all active:scale-95">
            <span className="material-symbols-outlined">person_add</span>
            New Member
          </Link>
        </div>
      </section>

      {/* Quick Insights Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">trending_up</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">New This Month</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-secondary">+124</span>
            <span className="text-xs text-secondary-dim font-label">↑ 12%</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">warning</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">At Risk/Inactive</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-error">42</span>
            <span className="text-xs text-error-dim font-label">Action Required</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">verified</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Renewal Success Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-primary">98.2%</span>
            <span className="text-xs text-primary-dim font-label">Peak Performance</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="glass-card p-4 rounded-xl flex flex-col lg:flex-row gap-4 border border-outline-variant/10">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-lg pl-12 pr-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 placeholder:text-outline transition-all" placeholder="Search by name, ID, or email..." type="text" />
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm text-on-surface font-label focus:ring-2 focus:ring-primary/50 min-w-[140px]">
            <option>Membership Tier</option>
            <option>Basic</option>
            <option>Pro</option>
            <option>Elite</option>
          </select>
          <select className="bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm text-on-surface font-label focus:ring-2 focus:ring-primary/50 min-w-[140px]">
            <option>Status</option>
            <option>Active</option>
            <option>Frozen</option>
            <option>Overdue</option>
          </select>
          <select className="bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm text-on-surface font-label focus:ring-2 focus:ring-primary/50 min-w-[140px]">
            <option>Last Check-in</option>
            <option>Today</option>
            <option>This Week</option>
            <option>Inactive &gt; 30 Days</option>
          </select>
        </div>
      </section>

      {/* Member Table */}
      <TableContainer>
        <TableToolbar title="Member List">
          <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">sms</span>
            Bulk SMS
          </button>
          <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 text-xs font-label text-secondary hover:text-secondary-fixed transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export
          </button>
        </TableToolbar>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Check-in</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBufINktNLve1_PAehhrfPM0zeCp-s9hOEP80L8LyE2AeHAr3kTANAj4uTfuxyAm5crdzYtmBrkNhoZSWprjgZY0NbmyoUAzHlAgvVnbcF1Bi5SpUxcHJ3isAOX1aysHsraIAEXkEaTVS3898MWHJn_E1DD-oIvZER5VQG6hy2UTmnzIWyNlIbIew0nvDR9NQHI0f1ebvMCwHEwleOp3stxgr8KAEs6CWBlNeLZditIH2L5Mv_-dBKZxbpPELNFr7MnV29AOhU1k3A" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">Sarah Jenkins</p>
                    <p className="text-xs text-on-surface-variant mt-1">s.jenkins@icloud.com</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-label text-sm text-on-surface-variant">#VEL-8821</TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full border border-secondary/20">Elite</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#c3f400]"></span>
                  <span className="text-sm font-label text-on-surface">Active</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-label text-on-surface">Oct 24, 2023</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Downtown Hub</p>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send SMS"><span className="material-symbols-outlined text-lg">sms</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send Email"><span className="material-symbols-outlined text-lg">mail</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="View Profile"><span className="material-symbols-outlined text-lg">visibility</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Edit Member"><span className="material-symbols-outlined text-lg">edit</span></button>
                </div>
              </TableCell>
            </TableRow>
            {/* Row 2 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCyNHYamgg67ow7FebFQxGKUVCyFqsRcDWxHDuITcb9JtoYY3_jvv31bZNzVr7Dl8ZCVFAOM4llDJsk-CTGmFhBuFuw6pZ7EG-Xz6mo7HSo5DllHlvFpYHZvARtxn1XEaQGk8vUHQ5jDczPsNAhV3cz5xC-MbLn3PI2kn8va7CmhPgsUUWs3w76iC4yve6FUkOM_782zLfsrLBenNgNwpDvpD0EMhctzcYGQgTBh4Nhu-qLfbt6LOsxZLTYJhU0oxM4eqrFK5JvfI" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">Marcus Thorne</p>
                    <p className="text-xs text-on-surface-variant mt-1">m.thorne@velocity.com</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-label text-sm text-on-surface-variant">#VEL-1294</TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Pro</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#6dddff]"></span>
                  <span className="text-sm font-label text-on-surface">Frozen</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-label text-on-surface">Oct 12, 2023</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Westside Annex</p>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send SMS"><span className="material-symbols-outlined text-lg">sms</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send Email"><span className="material-symbols-outlined text-lg">mail</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="View Profile"><span className="material-symbols-outlined text-lg">visibility</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Edit Member"><span className="material-symbols-outlined text-lg">edit</span></button>
                </div>
              </TableCell>
            </TableRow>
            {/* Row 3 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj55kP9-TYFsnIRsKHC5xbO41QMZ_JCoW7A3UgmRteVFYFTlv9LY3DsM32hdgMlrFZa6EP6NqxQG173kNpAtcJdJtSU9G4Cq3dX811LqJ11RR363MSZpvbQK9pdIzBhJhVVUSmkUbuFl-zCLX_c5uXHq80Igt0qfRFOqV-zZqL--MQUGMy2hlENBi9fbrnNIb7jHDMOmoRfzC4ScAmFoTTEs5W62EN-BGO5Z_ws0KTDX-bRfg6FuaXnapkRYdkxvlzGvZ1Gz0PllE" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">Elena Rodriguez</p>
                    <p className="text-xs text-on-surface-variant mt-1">elena.rod@gmail.com</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-label text-sm text-on-surface-variant">#VEL-5510</TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-outline/10 text-outline text-[10px] font-black uppercase tracking-widest rounded-full border border-outline/20">Basic</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-error shadow-[0_0_8px_#ff716c]"></span>
                  <span className="text-sm font-label text-on-surface">Overdue</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-label text-on-surface">Sep 28, 2023</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">East Gate Studio</p>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send SMS"><span className="material-symbols-outlined text-lg">sms</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send Email"><span className="material-symbols-outlined text-lg">mail</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="View Profile"><span className="material-symbols-outlined text-lg">visibility</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Edit Member"><span className="material-symbols-outlined text-lg">edit</span></button>
                </div>
              </TableCell>
            </TableRow>
            {/* Row 4 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwEWGflcwm1WenZH5KIEc8DTyoNBp-41fTWEfv0hCy_fq0gvH1p1NPiWthyYq_5u8RLCa1iBFcLN2uIUsteC2sDPHgGsGVfiVVcmsSK70aBrMH1lROXfhfza0BRpLxdmqE0DXfYRnKKx7xaP4M5OGp6ewZcvJXg_8mvbFSF4IYnnsUdkbvxk8-TaQYok96Gst0ImE1it-e_hKDUcdpr28x5ZFV_Aj_mQtobIu6vGGweHpEroBOpDhJwhJikKuoCPIyvvRXWUivibI" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">David Kim</p>
                    <p className="text-xs text-on-surface-variant mt-1">dkim@techcorp.io</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-label text-sm text-on-surface-variant">#VEL-7201</TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full border border-secondary/20">Elite</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#c3f400]"></span>
                  <span className="text-sm font-label text-on-surface">Active</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-label text-on-surface">Oct 25, 2023</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Downtown Hub</p>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send SMS"><span className="material-symbols-outlined text-lg">sms</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send Email"><span className="material-symbols-outlined text-lg">mail</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="View Profile"><span className="material-symbols-outlined text-lg">visibility</span></button>
                  <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Edit Member"><span className="material-symbols-outlined text-lg">edit</span></button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        {/* Pagination Footer */}
        <TablePagination />
      </TableContainer>
    </div>
  );
}
