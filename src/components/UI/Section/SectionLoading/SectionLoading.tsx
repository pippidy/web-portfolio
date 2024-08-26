export default function SectionLoading() {
  return (
    <div className="loading-section" aria-label="Content is loading">
      <div className="loading-section__spinner">
        <span className="loading-section__spinner-text">LOADING...</span>
        <div className="loading-section__spinner-line"></div>
        <span className="loading-section__spinner-center"></span>
      </div>
    </div>
  );
}
