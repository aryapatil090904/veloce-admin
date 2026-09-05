import React from 'react';
import Link from 'next/link';

export default function DemoLibraryPage() {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline text-4xl font-bold text-on-background tracking-tight">Workout Demo Library</h2>
          <p className="font-body text-base text-on-surface-variant mt-2">Manage and curate high-performance exercise demonstrations.</p>
        </div>
        <Link href="/demo-library/upload" className="bg-secondary text-on-secondary font-headline font-bold py-3 px-6 rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(184,255,0,0.2)]">
          <span className="material-symbols-outlined">upload</span>
          Upload New
        </Link>
      </header>
      
      {/* Filters Section */}
      <section className="glass-card rounded-[2rem] p-6 mb-8 flex flex-col md:flex-row gap-6 items-end relative z-10 border border-outline-variant/15">
        <div className="w-full md:w-1/4">
          <label className="block font-label text-sm text-on-surface-variant mb-2">Muscle Group</label>
          <div className="relative">
            <select className="w-full bg-surface-container-low border border-outline-variant/15 text-on-surface text-base rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all font-body">
              <option>All Muscle Groups</option>
              <option>Legs</option>
              <option>Chest</option>
              <option>Back</option>
              <option>Core</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <label className="block font-label text-sm text-on-surface-variant mb-2">Equipment</label>
          <div className="relative">
            <select className="w-full bg-surface-container-low border border-outline-variant/15 text-on-surface text-base rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all font-body">
              <option>All Equipment</option>
              <option>Barbell</option>
              <option>Dumbbell</option>
              <option>Kettlebell</option>
              <option>Bodyweight</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <label className="block font-label text-sm text-on-surface-variant mb-2">Difficulty</label>
          <div className="relative">
            <select className="w-full bg-surface-container-low border border-outline-variant/15 text-on-surface text-base rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all font-body">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Elite</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
        <div className="w-full md:w-1/4 flex justify-end">
          <button className="bg-surface-container-high border border-outline-variant/15 text-secondary font-bold py-3 px-6 rounded-xl hover:bg-surface-bright transition-colors w-full md:w-auto flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Apply Filters
          </button>
        </div>
      </section>

      {/* Grid of Demo Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <article className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden group relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="relative h-48 w-full bg-surface-container-lowest overflow-hidden">
            <img alt="Barbell Squat Demo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuc-oIYz6cctI074jIXK-13fK6X9m8Uu_sC-7cV5HWP2J15LKBJt-cCucXrrclXghsjlszTqVlqYGiXTF-oUIPhAm9iCSkzuVj64VkCxlEW57KjSk8Y27rOFVtpJTNZcb08qTrZYgbYwDn-XdMANfCGqBNkbW0yvyfgQirW4TuAscZzbYVebL7oeMHwRbMaCPzbIFOf98U7u-IXt2Ry22ewmTsNtQhJWvGAIOsIW4o6x01a2ceEEKx"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90"></div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface">Intermediate</span>
            </div>
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-on-surface hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-error hover:bg-error/20 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Barbell Back Squat</h3>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Legs</span>
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Glutes</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant font-body text-sm pt-4 border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span>Barbell, Rack</span>
            </div>
          </div>
        </article>

        {/* Card 2 */}
        <article className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden group relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="relative h-48 w-full bg-surface-container-lowest overflow-hidden">
            <img alt="Deadlift Demo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl04nZP2cED0CHz9HpQjMREL8cLQ_DV9DtkBHBeCrQS5gk2cmJZaF93uujVEFdYJxhc1-Qq3SRxm2dMEf4PhfpPUreqzcxJOict3m6x1G1xYzi1cWsQAN7RFUJ2bffk8vJakriTds-eXEufV6Z10mwFtsnMeecrhfG2qlXHY6uhuCyD4IAP83ePTH5UXkyl-q3w3Drmq8Uzk7Bh_b2BZ1O5djGFwpRy56D4CTr2wYqiXaj71PqkPlK"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90"></div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface">Advanced</span>
            </div>
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-on-surface hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-error hover:bg-error/20 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Conventional Deadlift</h3>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Back</span>
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Hamstrings</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant font-body text-sm pt-4 border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span>Barbell</span>
            </div>
          </div>
        </article>

        {/* Card 3 */}
        <article className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden group relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="relative h-48 w-full bg-surface-container-lowest overflow-hidden">
            <img alt="Kettlebell Swing Demo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8BaJUd8YjptoCzkgKWWz9teOMAQ0hZYGR6YnPA157zm8Bw8OXgCVoqwkapD_Oco6gc9hB8LZaqBsc6Y70YwvRHKsbqmb9zjrhBhJS-uxwm_b0R50jMqKhLedCsEfMZM4zgmxFCbx8Zpp3AQFfgKFe5ZYYSumdYPqrE0fRMb8L_pQ6cZZWbCXJ8FOVmJPnTOkEjsbtpiWzp29ht7JbMxwU-p2a788MVJdSb8ZNmMupYP2NHteq8bKC"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90"></div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface">Beginner</span>
            </div>
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-on-surface hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-error hover:bg-error/20 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Kettlebell Swing</h3>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Full Body</span>
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Power</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant font-body text-sm pt-4 border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span>Kettlebell</span>
            </div>
          </div>
        </article>

        {/* Card 4 */}
        <article className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden group relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="relative h-48 w-full bg-surface-container-lowest overflow-hidden">
            <img alt="Muscle Up Demo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUVP79FlxTDbTP4grNt--woAcJ0RRNvZn8hEigwq7eAzmwFnPKL7VRkxeYOh_Yqt1RazNsIS7V1-AHK_H3BWGDqpmT474j3AJAVhOjlVX854XSwPDXhy1CA4083lbhaAeXE-7URhUUbct1ROQScXQcmZu4zA3AE6afSNf9MfNaphcN3i24lclLGlxpPvXTav4thiXIg_E291YafimgFk3_k2OAmxN8IAQD9q1rYpnrw_GQ-YmrCgY9"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90"></div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface">Elite</span>
            </div>
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-on-surface hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-error hover:bg-error/20 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Strict Muscle-Up</h3>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Upper Body</span>
              <span className="bg-surface-container-high text-on-surface-variant font-label text-[10px] px-2 py-1 rounded-md uppercase">Gymnastics</span>
            </div>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant font-body text-sm pt-4 border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span>Pull-up Bar</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
