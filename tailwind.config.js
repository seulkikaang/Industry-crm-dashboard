module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // 모든 JS/TSX 파일 포함
  theme: {
    extend: {
	 colors: {
        'blue-500': '#2563eb',
        'blue-100': '#dbeafe',
        'gray-100': '#f3f4f6',
        'gray-700': '#374151',
      },
	},
  },
  plugins: [],
};