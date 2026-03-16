export type QuestionLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';

export interface MCQ {
  id: string;
  type: 'mcq';
  text: string;
  options: string[];
  correctAnswer: number;
  level: QuestionLevel;
  explanation: string;
}

export interface TFStatement {
  text: string;
  isTrue: boolean;
  explanation: string;
}

export interface TFQuestion {
  id: string;
  type: 'tf';
  text: string;
  statements: TFStatement[];
  level: QuestionLevel;
}

export interface SAQuestion {
  id: string;
  type: 'sa';
  text: string;
  correctAnswer: string;
  level: QuestionLevel;
  explanation: string;
}

export const mcqQuestions: MCQ[] = [
  { id: 'm1', type: 'mcq', text: 'Một lớp có 15 nam và 20 nữ. Có bao nhiêu cách chọn 1 học sinh làm lớp trưởng?', options: ['35', '300', '15', '20'], correctAnswer: 0, level: 'nhan_biet', explanation: 'Sử dụng quy tắc cộng: Chọn 1 học sinh từ 15 nam hoặc 20 nữ, ta có 15 + 20 = 35 cách.' },
  { id: 'm2', type: 'mcq', text: 'Từ A đến B có 3 con đường, từ B đến C có 4 con đường. Số cách đi từ A đến C qua B là?', options: ['7', '81', '64', '12'], correctAnswer: 3, level: 'nhan_biet', explanation: 'Sử dụng quy tắc nhân: Đi từ A đến B có 3 cách, từ B đến C có 4 cách. Số cách đi từ A đến C là 3 × 4 = 12 cách.' },
  { id: 'm3', type: 'mcq', text: 'Ký hiệu của số hoán vị của n phần tử là?', options: ['Cₙᵏ', 'Pₙ = n!', 'Aₙᵏ', 'n'], correctAnswer: 1, level: 'nhan_biet', explanation: 'Số hoán vị của n phần tử được ký hiệu là Pₙ và tính bằng n!.' },
  { id: 'm4', type: 'mcq', text: 'Công thức tính số chỉnh hợp chập k của n phần tử là?', options: ['n! / (n-k)!', 'n! / (k!(n-k)!)', 'n!', 'k!'], correctAnswer: 0, level: 'nhan_biet', explanation: 'Số chỉnh hợp chập k của n phần tử là Aₙᵏ = n! / (n-k)!.' },
  { id: 'm5', type: 'mcq', text: 'Công thức tính số tổ hợp chập k của n phần tử là?', options: ['n! / (n-k)!', 'n!', 'n! / (k!(n-k)!)', 'k!'], correctAnswer: 2, level: 'nhan_biet', explanation: 'Số tổ hợp chập k của n phần tử là Cₙᵏ = n! / (k!(n-k)!).' },
  { id: 'm6', type: 'mcq', text: 'Khai triển nhị thức Newton của (a+b)⁴ có bao nhiêu số hạng?', options: ['4', '5', '6', '3'], correctAnswer: 1, level: 'nhan_biet', explanation: 'Khai triển (a+b)ⁿ có n + 1 số hạng. Với n = 4, số hạng là 4 + 1 = 5.' },
  { id: 'm7', type: 'mcq', text: 'Tam thức bậc hai có dạng nào sau đây?', options: ['ax + b', 'ax³ + bx² + cx + d', 'ax² + bx + c (a ≠ 0)', 'ax⁴ + bx² + c'], correctAnswer: 2, level: 'nhan_biet', explanation: 'Tam thức bậc hai có dạng f(x) = ax² + bx + c với điều kiện a ≠ 0.' },
  { id: 'm8', type: 'mcq', text: 'Cho tam thức f(x) = ax² + bx + c (a ≠ 0) có Δ < 0. Khi đó f(x) cùng dấu với a khi nào?', options: ['Với mọi x ∈ ℝ', 'Với mọi x > 0', 'Vô nghiệm', 'x ∈ ∅'], correctAnswer: 0, level: 'nhan_biet', explanation: 'Theo định lý về dấu của tam thức bậc hai, nếu Δ < 0 thì f(x) luôn cùng dấu với hệ số a với mọi x ∈ ℝ.' },
  { id: 'm9', type: 'mcq', text: 'Bất phương trình nào sau đây là bất phương trình bậc hai một ẩn?', options: ['2x - 3 > 0', '2x² - 3x + 1 > 0', 'x³ - 1 > 0', 'x + y > 0'], correctAnswer: 1, level: 'nhan_biet', explanation: 'Bất phương trình bậc hai một ẩn có dạng ax² + bx + c > 0 (hoặc <, ≥, ≤) với a ≠ 0. Ở đây là 2x² - 3x + 1 > 0.' },
  { id: 'm10', type: 'mcq', text: 'Điều kiện xác định của phương trình √(x - 1) = x - 3 là?', options: ['x ≥ 3', 'x > 1', 'x ≥ 1', 'x > 3'], correctAnswer: 2, level: 'nhan_biet', explanation: 'Biểu thức dưới dấu căn phải không âm, tức là x - 1 ≥ 0 ⇔ x ≥ 1.' },
  { id: 'm11', type: 'mcq', text: 'Có bao nhiêu số tự nhiên có 3 chữ số khác nhau được lập từ các chữ số 1, 2, 3, 4, 5?', options: ['125', '10', '60', '15'], correctAnswer: 2, level: 'thong_hieu', explanation: 'Số cách chọn 3 chữ số khác nhau từ 5 chữ số và sắp xếp chúng là chỉnh hợp chập 3 của 5: A₅³ = 5! / 2! = 60.' },
  { id: 'm12', type: 'mcq', text: 'Một tổ có 10 người, cần chọn ra 3 người để làm trực nhật. Số cách chọn là?', options: ['720', '120', '30', '1000'], correctAnswer: 1, level: 'thong_hieu', explanation: 'Chọn 3 người từ 10 người không phân biệt thứ tự là tổ hợp chập 3 của 10: C₁₀³ = 120.' },
  { id: 'm13', type: 'mcq', text: 'Hệ số của x² trong khai triển (x + 2)⁴ là?', options: ['16', '8', '32', '24'], correctAnswer: 3, level: 'thong_hieu', explanation: 'Số hạng tổng quát là C₄ᵏ x⁴⁻ᵏ 2ᵏ. Để có x², ta cần 4 - k = 2 ⇔ k = 2. Hệ số là C₄² × 2² = 6 × 4 = 24.' },
  { id: 'm14', type: 'mcq', text: 'Tam thức f(x) = x² - 5x + 6 nhận giá trị âm khi x thuộc khoảng nào?', options: ['(-∞; 2) ∪ (3; +∞)', '(2; 3)', '[2; 3]', '(0; 2)'], correctAnswer: 1, level: 'thong_hieu', explanation: 'f(x) = 0 có 2 nghiệm x = 2, x = 3. Hệ số a = 1 > 0. f(x) < 0 (trái dấu a) khi x nằm trong khoảng 2 nghiệm: x ∈ (2; 3).' },
  { id: 'm15', type: 'mcq', text: 'Tập nghiệm của bất phương trình x² - 4 ≤ 0 là?', options: ['[-2; 2]', '(-2; 2)', '(-∞; -2] ∪ [2; +∞)', 'ℝ'], correctAnswer: 0, level: 'thong_hieu', explanation: 'x² - 4 = 0 có nghiệm x = ±2. Hệ số a = 1 > 0. x² - 4 ≤ 0 khi x ∈ [-2; 2].' },
  { id: 'm16', type: 'mcq', text: 'Số nghiệm của phương trình √(x² - 4x + 3) = x - 1 là?', options: ['0', '2', '1', '3'], correctAnswer: 2, level: 'thong_hieu', explanation: 'ĐK: x - 1 ≥ 0 ⇔ x ≥ 1. Bình phương 2 vế: x² - 4x + 3 = (x - 1)² ⇔ x² - 4x + 3 = x² - 2x + 1 ⇔ 2x = 2 ⇔ x = 1 (thỏa mãn). Vậy pt có 1 nghiệm.' },
  { id: 'm17', type: 'mcq', text: 'Từ các chữ số 0, 1, 2, 3, 4, 5 có thể lập được bao nhiêu số chẵn gồm 3 chữ số khác nhau?', options: ['60', '100', '120', '52'], correctAnswer: 3, level: 'thong_hieu', explanation: 'Gọi số cần tìm là abc. c ∈ {0, 2, 4}. TH1: c = 0 (1 cách), a có 5 cách, b có 4 cách → 20 số. TH2: c ∈ {2, 4} (2 cách), a ≠ 0, c (4 cách), b ≠ a, c (4 cách) → 2 × 4 × 4 = 32 số. Tổng: 20 + 32 = 52 số.' },
  { id: 'm18', type: 'mcq', text: 'Số hạng không chứa x trong khai triển (x - 1/x)⁶ là?', options: ['20', '-20', '15', '-15'], correctAnswer: 1, level: 'thong_hieu', explanation: 'Số hạng tổng quát: C₆ᵏ x⁶⁻ᵏ (-1/x)ᵏ = C₆ᵏ (-1)ᵏ x⁶⁻²ᵏ. Không chứa x khi 6 - 2k = 0 ⇔ k = 3. Số hạng là C₆³ (-1)³ = -20.' },
  { id: 'm19', type: 'mcq', text: 'Một hộp có 5 bi đỏ, 4 bi xanh, 3 bi vàng. Chọn ngẫu nhiên 3 viên bi. Số cách chọn sao cho có ít nhất 1 bi đỏ là?', options: ['220', '35', '185', '100'], correctAnswer: 2, level: 'van_dung', explanation: 'Tổng số bi là 12. Số cách chọn 3 bi bất kỳ là C₁₂³ = 220. Số cách chọn 3 bi không có bi đỏ (chỉ xanh và vàng, tổng 7 bi) là C₇³ = 35. Số cách chọn có ít nhất 1 bi đỏ là 220 - 35 = 185.' },
  { id: 'm20', type: 'mcq', text: 'Tìm m để tam thức f(x) = x² - 2mx + m + 2 > 0 với mọi x ∈ ℝ.', options: ['m < -1 hoặc m > 2', '-1 ≤ m ≤ 2', 'm > 2', '-1 < m < 2'], correctAnswer: 3, level: 'van_dung', explanation: 'Để f(x) > 0 ∀x ∈ ℝ thì a = 1 > 0 (luôn đúng) và Δ\' < 0 ⇔ m² - (m + 2) < 0 ⇔ m² - m - 2 < 0 ⇔ -1 < m < 2.' },
  { id: 'm21', type: 'mcq', text: 'Phương trình √(2x² - 3x - 5) = √(x² - 3) có bao nhiêu nghiệm?', options: ['2', '1', '0', '3'], correctAnswer: 1, level: 'van_dung', explanation: 'Hệ ĐK: x² - 3 ≥ 0 và 2x² - 3x - 5 = x² - 3. Giải pt: x² - 3x - 2 = 0 ⇔ x = (3 ± √17)/2. Thử lại điều kiện x² ≥ 3, chỉ có x = (3 + √17)/2 thỏa mãn. Vậy có 1 nghiệm.' },
  { id: 'm22', type: 'mcq', text: 'Có bao nhiêu giá trị nguyên của m thuộc [-10; 10] để phương trình x² - 2(m-1)x + m² - 3m = 0 có 2 nghiệm phân biệt?', options: ['10', '12', '11', '9'], correctAnswer: 2, level: 'van_dung', explanation: 'Để pt có 2 nghiệm phân biệt thì Δ\' > 0 ⇔ (m-1)² - (m² - 3m) > 0 ⇔ m² - 2m + 1 - m² + 3m > 0 ⇔ m + 1 > 0 ⇔ m > -1. Vì m ∈ [-10; 10] và m nguyên nên m ∈ {0, 1, ..., 10}, có 11 giá trị.' },
  { id: 'm23', type: 'mcq', text: 'Khai triển (1 + 2x)ⁿ có tổng các hệ số bằng 729. Tìm hệ số của x³.', options: ['20', '240', '60', '160'], correctAnswer: 3, level: 'van_dung', explanation: 'Tổng các hệ số đạt được khi x = 1, tức là (1 + 2)ⁿ = 3ⁿ = 729 ⇔ n = 6. Khai triển (1 + 2x)⁶, hệ số của x³ là C₆³ 2³ = 20 × 8 = 160.' },
  { id: 'm24', type: 'mcq', text: 'Một nhóm gồm 6 nam và 4 nữ. Cần lập 1 đoàn đại biểu gồm 5 người sao cho có ít nhất 2 nữ. Số cách lập là?', options: ['252', '186', '120', '66'], correctAnswer: 1, level: 'van_dung', explanation: 'Các trường hợp: 2 nữ 3 nam (C₄² × C₆³ = 6 × 20 = 120), 3 nữ 2 nam (C₄³ × C₆² = 4 × 15 = 60), 4 nữ 1 nam (C₄⁴ × C₆¹ = 1 × 6 = 6). Tổng cộng: 120 + 60 + 6 = 186 cách.' },
];

export const tfQuestions: TFQuestion[] = [
  {
    id: 'tf1',
    type: 'tf',
    text: 'Về quy tắc đếm và hoán vị, chỉnh hợp, tổ hợp:',
    statements: [
      { text: 'Số cách sắp xếp 5 người vào 5 ghế trống là 120 cách.', isTrue: true, explanation: 'Số cách sắp xếp 5 người vào 5 ghế là hoán vị của 5 phần tử: P₅ = 5! = 120.' },
      { text: 'Số cách chọn 2 học sinh từ 10 học sinh để phân công 1 làm tổ trưởng, 1 làm tổ phó là C₁₀².', isTrue: false, explanation: 'Vì có phân công chức vụ (có thứ tự) nên phải dùng chỉnh hợp: A₁₀² = 90 cách. C₁₀² chỉ là chọn 2 người không phân biệt thứ tự.' },
      { text: 'Cₙᵏ = Cₙⁿ⁻ᵏ với mọi 0 ≤ k ≤ n.', isTrue: true, explanation: 'Đây là tính chất đối xứng của số tổ hợp.' },
      { text: 'Aₙᵏ = k! × Cₙᵏ.', isTrue: true, explanation: 'Đây là mối liên hệ giữa chỉnh hợp và tổ hợp: số chỉnh hợp bằng số tổ hợp nhân với số hoán vị của k phần tử.' },
    ],
    level: 'thong_hieu'
  },
  {
    id: 'tf2',
    type: 'tf',
    text: 'Về nhị thức Newton:',
    statements: [
      { text: 'Khai triển (x - 2)⁵ có 5 số hạng.', isTrue: false, explanation: 'Khai triển nhị thức bậc n có n + 1 số hạng. Bậc 5 sẽ có 6 số hạng.' },
      { text: 'Tổng các hệ số trong khai triển (2x - 1)²⁰²⁴ bằng 1.', isTrue: true, explanation: 'Tổng các hệ số tính bằng cách thay x = 1 vào nhị thức: (2(1) - 1)²⁰²⁴ = 1²⁰²⁴ = 1.' },
      { text: 'Số hạng tổng quát trong khai triển (a+b)ⁿ là Cₙᵏ aⁿ⁻ᵏ bᵏ.', isTrue: true, explanation: 'Đây là công thức số hạng tổng quát chuẩn của nhị thức Newton.' },
      { text: 'Hệ số của x² trong khai triển (x + 1)⁴ là 4.', isTrue: false, explanation: 'Hệ số của x² là C₄² = 6, không phải 4.' },
    ],
    level: 'thong_hieu'
  },
  {
    id: 'tf3',
    type: 'tf',
    text: 'Về dấu của tam thức bậc hai f(x) = ax² + bx + c (a ≠ 0):',
    statements: [
      { text: 'Nếu Δ < 0 thì f(x) luôn cùng dấu với hệ số a với mọi x ∈ ℝ.', isTrue: true, explanation: 'Đây là nội dung định lý về dấu của tam thức bậc hai.' },
      { text: 'Nếu Δ = 0 thì f(x) ≥ 0 với mọi x ∈ ℝ.', isTrue: false, explanation: 'Chỉ đúng khi a > 0. Nếu a < 0 và Δ = 0 thì f(x) ≤ 0 với mọi x ∈ ℝ.' },
      { text: 'Tam thức f(x) = -x² + 4x - 4 luôn nhận giá trị âm với mọi x ≠ 2.', isTrue: true, explanation: 'f(x) = -(x - 2)². Ta có -(x - 2)² < 0 với mọi x ≠ 2.' },
      { text: 'Bất phương trình x² - 3x + 2 < 0 có tập nghiệm là (1; 2).', isTrue: true, explanation: 'Tam thức có 2 nghiệm x = 1, x = 2. Hệ số a = 1 > 0. Để f(x) < 0 thì x nằm trong khoảng 2 nghiệm: x ∈ (1; 2).' },
    ],
    level: 'thong_hieu'
  },
  {
    id: 'tf4',
    type: 'tf',
    text: 'Về phương trình quy về bậc hai:',
    statements: [
      { text: 'Phương trình √(f(x)) = g(x) tương đương với hệ g(x) ≥ 0 và f(x) = [g(x)]².', isTrue: true, explanation: 'Đây là phép biến đổi tương đương chuẩn để giải phương trình vô tỉ dạng này.' },
      { text: 'Phương trình √(x² - 1) = √(1 - x²) có vô số nghiệm.', isTrue: false, explanation: 'Điều kiện: x² - 1 ≥ 0 và 1 - x² ≥ 0 ⇔ x² = 1 ⇔ x = ±1. Phương trình chỉ có 2 nghiệm.' },
      { text: 'Bình phương 2 vế của một phương trình luôn thu được phương trình tương đương.', isTrue: false, explanation: 'Bình phương 2 vế có thể làm xuất hiện nghiệm ngoại lai, do đó phương trình thu được là phương trình hệ quả, không phải tương đương.' },
      { text: 'Phương trình √(x - 2) = -1 vô nghiệm.', isTrue: true, explanation: 'Căn bậc hai số học luôn không âm (≥ 0), nên không thể bằng -1.' },
    ],
    level: 'thong_hieu'
  }
];

export const saQuestions: SAQuestion[] = [
  { id: 'sa1', type: 'sa', text: 'Tính giá trị của biểu thức P = C₅² + A₄².', correctAnswer: '22', level: 'thong_hieu', explanation: 'C₅² = 5! / (2!3!) = 10. A₄² = 4! / 2! = 12. P = 10 + 12 = 22.' },
  { id: 'sa2', type: 'sa', text: 'Có bao nhiêu cách xếp 4 quyển sách Toán và 3 quyển sách Văn lên một kệ sách dài sao cho các quyển sách cùng môn đứng cạnh nhau?', correctAnswer: '288', level: 'van_dung', explanation: 'Coi 4 sách Toán là 1 khối, 3 sách Văn là 1 khối. Xếp 2 khối có 2! cách. Đổi chỗ 4 sách Toán có 4! cách. Đổi chỗ 3 sách Văn có 3! cách. Tổng: 2! × 4! × 3! = 2 × 24 × 6 = 288 cách.' },
  { id: 'sa3', type: 'sa', text: 'Tìm hệ số của x⁴ trong khai triển (2x + 1)⁵.', correctAnswer: '80', level: 'thong_hieu', explanation: 'Số hạng tổng quát: C₅ᵏ (2x)⁵⁻ᵏ 1ᵏ = C₅ᵏ 2⁵⁻ᵏ x⁵⁻ᵏ. Để có x⁴ thì 5 - k = 4 ⇔ k = 1. Hệ số là C₅¹ 2⁴ = 5 × 16 = 80.' },
  { id: 'sa4', type: 'sa', text: 'Tìm giá trị nhỏ nhất của hàm số y = x² - 4x + 5.', correctAnswer: '1', level: 'thong_hieu', explanation: 'y = x² - 4x + 4 + 1 = (x - 2)² + 1 ≥ 1. Dấu "=" xảy ra khi x = 2. Vậy GTNN là 1.' },
  { id: 'sa5', type: 'sa', text: 'Bất phương trình -x² + 5x - 6 ≥ 0 có bao nhiêu nghiệm nguyên?', correctAnswer: '2', level: 'thong_hieu', explanation: '-x² + 5x - 6 = 0 có 2 nghiệm x = 2, x = 3. BPT ⇔ 2 ≤ x ≤ 3. Các nghiệm nguyên là 2 và 3. Vậy có 2 nghiệm nguyên.' },
  { id: 'sa6', type: 'sa', text: 'Tổng các nghiệm của phương trình √(x² - 3x + 2) = √(x + 2) là bao nhiêu?', correctAnswer: '4', level: 'van_dung', explanation: 'ĐK: x + 2 ≥ 0 ⇔ x ≥ -2. Bình phương: x² - 3x + 2 = x + 2 ⇔ x² - 4x = 0 ⇔ x = 0 hoặc x = 4. Cả 2 nghiệm đều thỏa mãn ĐK x ≥ -2. Tổng các nghiệm là 0 + 4 = 4.' },
  { id: 'sa7', type: 'sa', text: 'Một đa giác đều có 10 cạnh. Số đường chéo của đa giác đó là bao nhiêu?', correctAnswer: '35', level: 'thong_hieu', explanation: 'Số đoạn thẳng nối 2 đỉnh bất kỳ là C₁₀² = 45. Số cạnh là 10. Số đường chéo là 45 - 10 = 35.' },
  { id: 'sa8', type: 'sa', text: 'Tìm giá trị nguyên nhỏ nhất của m để bất phương trình x² - 2x + m > 0 nghiệm đúng với mọi x ∈ ℝ.', correctAnswer: '2', level: 'van_dung', explanation: 'Để BPT đúng ∀x ∈ ℝ thì Δ\' < 0 ⇔ (-1)² - m < 0 ⇔ 1 - m < 0 ⇔ m > 1. Giá trị nguyên nhỏ nhất của m là 2.' },
];
