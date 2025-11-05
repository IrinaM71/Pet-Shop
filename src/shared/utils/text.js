export const makeExpandable = (
  text = "",
  maxLength = 450,
  minHiddenLength = 150
) => {
  const fullText = String(text);
  const hiddenCount = Math.max(0, fullText.length - maxLength);
  const canToggle = hiddenCount >= minHiddenLength;
  const shortText = canToggle
    ? fullText.slice(0, maxLength).trimEnd() + "..."
    : fullText;
  return { fullText, shortText, canToggle };
};
