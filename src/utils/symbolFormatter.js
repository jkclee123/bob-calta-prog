
export const formatCodeForDisplay = (codeText) => {
  return codeText
    .replace(/₁₀\^\(/g, '<span class="math-symbol">10^(</span>')
    .replace(/M⁺/g, '<span class="math-symbol">M+</span>')
    .replace(/M⁻/g, '<span class="math-symbol">M-</span>')
    .replace(/⁻¹/g, '<span class="math-symbol">-1</span>')
    .replace(/DT/g, '<span class="math-symbol">DT</span>')
}; 