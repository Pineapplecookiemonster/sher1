export default function VideoPage() {
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
  width="100%"
  height="100%"
  src="https://www.youtube-nocookie.com/embed/eVu42-x6_wY?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1"
  title="Hidden Video"
  frameBorder="0"
  allow="autoplay; encrypted-media; picture-in-picture"
  allowFullScreen
  referrerPolicy="strict-origin-when-cross-origin"
  style={{ border: "none" }}
/>
    </main>
  );
}