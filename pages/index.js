import { useState } from 'react';

export default function Home() {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');

  const handleLaunch = async () => {
    const res1 = await fetch(`/api/cache-json?url=${encodeURIComponent(url1)}&file=1.json`);
    const res2 = await fetch(`/api/cache-json?url=${encodeURIComponent(url2)}&file=2.json`);
    
    if (res1.ok && res2.ok) {
      const finalUrl = `https://demo.tourplanning.ext.here.com/?file-url=${window.location.origin}/json/1.json&file-url=${window.location.origin}/json/2.json`;
      window.open(finalUrl, '_blank');
    } else {
      alert('Failed to cache one or both files');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter GitHub Raw JSON URLs</h2>
      <input type="text" placeholder="Raw URL 1" value={url1} onChange={e => setUrl1(e.target.value)} style={{ width: '100%' }} />
      <br /><br />
      <input type="text" placeholder="Raw URL 2" value={url2} onChange={e => setUrl2(e.target.value)} style={{ width: '100%' }} />
      <br /><br />
      <button onClick={handleLaunch}>Launch in HERE Maps</button>
    </div>
  );
}
