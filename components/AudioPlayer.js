import { Music } from 'lucide-react';

export default function AudioPlayer() {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/70 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-700 z-50 w-60 flex items-center space-x-3">
      <Music className="text-purple-300 w-5 h-5 shrink-0" />
      <audio controls className="w-full">
        <source src="/lagu.mp3" type="audio/mpeg" />
        Browser tidak mendukung audio.
      </audio>
    </div>
  );
}
