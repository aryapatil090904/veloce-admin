"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function UploadDemoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 max-w-[1600px] mx-auto relative z-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 relative z-20">
        <div>
          <p className="font-label text-xs text-secondary uppercase tracking-[0.2em] mb-2 font-bold">Asset Management</p>
          <h2 className="font-headline text-4xl font-bold text-on-surface tracking-tight">Upload Workout Content</h2>
        </div>
        <Link href="/demo-library" className="bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-xl border border-outline-variant/15 hover:border-secondary/50 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(0,0,0,0.2)]">
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
          <span>Back to Library</span>
        </Link>
      </div>
      
      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        
        {/* Left Column (Asset Drop & Preview) */}
        <div className="lg:col-span-7 space-y-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`glass-card rounded-[2rem] border ${isDragging ? 'border-secondary bg-secondary/5' : 'border-outline-variant/15'} p-12 flex flex-col items-center justify-center text-center border-dashed hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(184,255,0,0.1)] transition-all cursor-pointer group`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="video/mp4,video/webm,image/gif"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-secondary/20">
              <span className="material-symbols-outlined text-4xl text-secondary">cloud_upload</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
              {file ? file.name : 'Drag & Drop Workout Asset'}
            </h3>
            <p className="text-on-surface-variant font-body">
              {file ? 'Click to change file' : 'Supports .mp4, .gif, and .webm (Max 50MB)'}
            </p>
          </div>
          
          <div className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden aspect-video bg-surface-container-lowest flex items-center justify-center relative">
            {previewUrl ? (
              file?.type.startsWith('video/') ? (
                <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant/30">
                <span className="material-symbols-outlined text-6xl mb-4">play_circle</span>
                <p className="font-label uppercase tracking-widest text-xs">Preview Loop Placeholder</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column (Metadata Form) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[2rem] border border-outline-variant/15 p-8 space-y-6">
            
            <div>
              <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">Exercise Name</label>
              <input 
                className="w-full bg-surface-container-low border border-outline-variant/15 text-on-surface font-body text-sm rounded-xl py-4 px-5 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-on-surface-variant/30" 
                placeholder="e.g. Bulgarian Split Squat" 
                type="text"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">Primary Muscle</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-low border border-outline-variant/15 text-on-surface font-body text-sm rounded-xl py-4 px-5 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all">
                    <option>Select...</option>
                    <option>Quads</option>
                    <option>Glutes</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
              
              <div>
                <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">Secondary Muscle</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-low border border-outline-variant/15 text-on-surface font-body text-sm rounded-xl py-4 px-5 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all">
                    <option>Select...</option>
                    <option>Hamstrings</option>
                    <option>Core</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">Equipment Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-surface-container-low border border-outline-variant/15 text-on-surface font-body text-sm rounded-xl py-4 px-5 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all">
                  <option>Dumbbell</option>
                  <option>Barbell</option>
                  <option>Bodyweight</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
            
            <div>
              <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">Difficulty Level</label>
              <div className="flex gap-2">
                <button type="button" className="flex-1 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/15 text-xs font-label text-on-surface hover:bg-surface-bright transition-colors">Beginner</button>
                <button type="button" className="flex-1 py-3 rounded-xl bg-secondary/10 border border-secondary/50 text-xs font-label text-secondary font-bold shadow-[0_0_15px_rgba(184,255,0,0.1)]">Intermediate</button>
                <button type="button" className="flex-1 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/15 text-xs font-label text-on-surface hover:bg-surface-bright transition-colors">Advanced</button>
              </div>
            </div>
            
            <div>
              <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">Tags / Keywords</label>
              <input 
                className="w-full bg-surface-container-low border border-outline-variant/15 text-on-surface font-body text-sm rounded-xl py-4 px-5 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-on-surface-variant/30" 
                placeholder="e.g. unilateral, explosive, strength" 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-4 pt-2">
            <button className="w-full bg-secondary text-on-secondary font-headline font-bold uppercase tracking-wider text-sm py-5 rounded-2xl shadow-[0_0_20px_rgba(184,255,0,0.3)] hover:shadow-[0_0_40px_rgba(184,255,0,0.5)] hover:brightness-110 active:scale-95 transition-all duration-300">
              Publish to Mobile App
            </button>
            <button className="w-full bg-surface-container-highest text-on-surface font-headline font-bold uppercase tracking-wider text-sm py-5 rounded-2xl border border-outline-variant/15 hover:bg-surface-container active:scale-95 transition-all">
              Save to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
