export function CopyButton({ content }: { content: string }) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch((err) => {
        alert(`Failed to copy: ${err}`);
      });
  };

  return (
    <button type="button" onClick={handleCopy}>
      Copy
    </button>
  );
}
