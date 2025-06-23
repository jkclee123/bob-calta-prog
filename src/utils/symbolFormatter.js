export const formatCodeForDisplay = (codeText) => {
  return codeText
    .replace(/₁₀\^\(/g, '<span class="math-symbol"><span class="subscript">10</span>^(</span>')
    .replace(/M⁺/g, '<span class="math-symbol">M+</span>')
    .replace(/M⁻/g, '<span class="math-symbol">M-</span>')
    .replace(/⁻¹/g, '<span class="math-symbol"><span class="superscript">-</span>¹</span>')
    .replace(/DT/g, '<span class="math-symbol subscript">DT</span>')
    .replace(/Z₀/g, '<span class="math-symbol">Z<span class="subscript">₀</span></span>')
}; 