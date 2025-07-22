export default function AudioPlayer() {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-3 rounded-lg shadow-lg z-50">
      <p className="text-white text-sm mb-1">Putar Lagu</p>
      <audio controls className="w-48">
        <source src="/lagu.mp3" type="audio/mpeg" />
        Browser kamu tidak mendukung audio.
      </audio>
    </div>
  );
}
