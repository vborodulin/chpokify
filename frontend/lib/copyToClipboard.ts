const fallbackCopyTextToClipboard = (text: string): boolean => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let isSuccessCopy = true;

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    isSuccessCopy = false;
  } finally {
    document.body.removeChild(textArea);
  }

  return isSuccessCopy;
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Async: Could not copy text: ', err);
    return false;
  }
};

export {
  copyToClipboard,
};
