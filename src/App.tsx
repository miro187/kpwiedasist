import React, { useState, useRef, useEffect } from 'react';
import { Check, Copy, Twitter, MessageCircle, Globe, Volume2, VolumeX, Youtube } from 'lucide-react';

function App() {
  const [copied, setCopied] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Start at 30% volume
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const contractAddress = "test";

  const memeQuotes = [
    "Never gonna give you up! 🎵",
    "Never gonna let you down! 🎤",
    "Never gonna run around and desert you! 🏃‍♂️",
    "Never gonna make you cry! 😢",
    "Never gonna say goodbye! 👋",
    "Never gonna tell a lie and hurt you! 💫"
  ];

  // Initialize audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMeme((prev) => (prev + 1) % memeQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <audio ref={audioRef} src="/never-gonna-give-you-up.mp3" loop />
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse [text-shadow:_0_0_15px_rgb(236_72_153_/_30%)]">
              $NEVERGIVEUP
            </span>
            <div className="flex items-center gap-6">
              {/* Volume Controls */}
              <div className="flex items-center gap-4">
                <div 
                  className={`bg-black/40 backdrop-blur-lg rounded-lg transform transition-all duration-300 ease-in-out flex items-center gap-3 ${
                    showVolume ? 'w-32 opacity-100 px-3 py-2' : 'w-0 opacity-0 px-0 py-2'
                  }`}
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className={`${showVolume ? 'w-full' : 'w-0'} h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg appearance-none cursor-pointer 
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:mt-[-2px]
                      hover:[&::-webkit-slider-thumb]:scale-125 transition-all`}
                  />
                </div>
                <button
                  onClick={togglePlay}
                  onMouseEnter={() => setShowVolume(true)}
                  className="p-2 rounded-full bg-black/40 hover:bg-pink-500/20 transition-all transform hover:scale-105 duration-300 ease-in-out"
                >
                  {!isPlaying ? 
                    <VolumeX size={18} className="animate-pulse text-gray-400 hover:text-pink-500" /> : 
                    <Volume2 size={18} className="animate-bounce text-gray-400 hover:text-pink-500" />
                  }
                </button>
              </div>

              <div className="w-px h-6 bg-white/10" /> {/* Divider */}

              <a 
                href="https://x.com/RICKROLL_Solana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-all transform hover:scale-110 duration-300"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-all transform hover:scale-110 duration-300"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left z-10 space-y-6">
              <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                $NEVERGIVEUP
              </h1>
              <p className="text-2xl text-gray-300">You Know The Rules, And So Do We 🎵</p>
              
              <div className="text-xl text-pink-500 font-medium animate-pulse">
                {memeQuotes[currentMeme]}
              </div>
              
              <div className="mt-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-pink-500/50 transition-all">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">CA:</span>
                      <span className="font-mono text-sm text-gray-200">{contractAddress}</span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-all"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/10">
              <img 
                src="https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
                alt="Rick Astley"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rick Roll Gallery */}
      <div className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Never Gonna Give You Up!
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
            {/* First Image with Text */}
            <div 
              className="group relative rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 aspect-[4/3]"
              data-aos="fade-right"
            >
              <div className="absolute inset-0">
                <img 
                  src="/images/rickastley.jpg"
                  alt="Classic Rick"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  "You know the rules, and so do I! 🎵"
                </p>
              </div>
            </div>

            {/* Second Image with Text */}
            <div 
              className="group relative rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 aspect-[4/3]"
              data-aos="fade-left"
            >
              <div className="absolute inset-0">
                <img 
                  src="/images/rick2.jpg"
                  alt="Modern Rick"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  "A full commitment's what I'm thinking of! 🚀"
                </p>
              </div>
            </div>
          </div>

          {/* Fun Facts - with updated styling to match */}
          <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div 
              className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all transform hover:scale-105 duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-3 text-pink-500">Did You Know? 🤔</h3>
              <p className="text-gray-300 text-lg">The original "Never Gonna Give You Up" video has over 1 billion views on YouTube!</p>
            </div>

            <div 
              className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all transform hover:scale-105 duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-500">Rickroll History 📚</h3>
              <p className="text-gray-300 text-lg">The first Rickroll happened on 4chan in 2007. Now it's an internet legend!</p>
            </div>

            <div 
              className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all transform hover:scale-105 duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-bold mb-3 text-pink-500">Rick's Take 🎤</h3>
              <p className="text-gray-300 text-lg">"I think it's just become this part of the internet that I'm forever going to be a part of."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenomics */}
      <div className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Tokenomics
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all">
              <h3 className="text-2xl mb-4 text-gray-200">Total Supply</h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                1,000,000,000
              </p>
              <p className="text-gray-400">$NEVERGIVEUP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;