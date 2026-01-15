
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedImage } from '../types';

const VisionLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4'>('1:1');

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      // Correct initialization right before making the API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: { aspectRatio }
        }
      });

      let imageUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setImages(prev => [{
          id: Date.now().toString(),
          url: imageUrl,
          prompt,
          timestamp: Date.now()
        }, ...prev]);
        setPrompt('');
      } else {
        alert("Failed to extract image data from response.");
      }
    } catch (error) {
      console.error('Image gen error:', error);
      alert("Error generating image. It might be due to safety filters or connection issues.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `lumina-gen-${id}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="p-6 border-b border-gray-800 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold">Image Forge</h2>
          <p className="text-sm text-gray-500">Gemini 2.5 Flash Image • High Fidelity</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass rounded-3xl p-6 space-y-6 border border-white/5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Describe your vision</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with floating neon gardens and bioluminescent rain..."
                className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all text-gray-200 resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Aspect Ratio</label>
              <div className="grid grid-cols-5 gap-2">
                {(['1:1', '16:9', '9:16', '4:3', '3:4'] as const).map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`h-10 rounded-lg flex items-center justify-center text-xs font-medium border transition-all ${
                      aspectRatio === ratio 
                      ? 'bg-pink-600 border-pink-500 text-white' 
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full h-14 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-2xl font-bold text-white shadow-xl shadow-pink-600/20 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {isGenerating ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Forging Image...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sparkles"></i>
                  Generate Image
                </>
              )}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border border-white/5">
            <h3 className="font-semibold mb-2">Editor's Note</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Gemini 2.5 Flash Image creates highly descriptive outputs. Try adding details about lighting (e.g., "cinematic lighting", "golden hour") or style ("digital art", "photorealistic").
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="lg:col-span-8 space-y-6">
          {images.length === 0 && !isGenerating ? (
            <div className="h-[500px] glass rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-gray-800">
              <div className="h-20 w-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
                <i className="fa-solid fa-image text-3xl text-gray-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-300">No images forged yet</h3>
              <p className="text-gray-500 max-w-xs mt-2">Enter a description on the left to start generating your artistic masterpieces.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {isGenerating && (
                <div className="break-inside-avoid glass rounded-3xl p-4 flex flex-col items-center justify-center h-64 border border-pink-500/30 animate-pulse">
                   <i className="fa-solid fa-wand-magic-sparkles text-3xl text-pink-500 mb-4 animate-bounce"></i>
                   <span className="text-pink-500 font-medium">Brewing magic...</span>
                </div>
              )}
              {images.map(img => (
                <div key={img.id} className="group relative break-inside-avoid rounded-3xl overflow-hidden glass border border-white/5 transition-all hover:scale-[1.02]">
                  <img src={img.url} className="w-full h-auto" alt={img.prompt} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <p className="text-xs text-white/90 line-clamp-2 mb-4 italic">"{img.prompt}"</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => downloadImage(img.url, img.id)}
                        className="flex-1 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-sm font-medium transition-all"
                      >
                        <i className="fa-solid fa-download mr-2"></i> Download
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all">
                        <i className="fa-solid fa-share-nodes"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionLab;
