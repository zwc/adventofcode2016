const codes = [
	{ code: 'ADVENT', length: 6 },
	{ code: 'A(1x5)BC', length: 7 },
	{ code: '(3x3)XYZ', length: 9 },
	{ code: 'A(2x2)BCD(2x2)EFG', length: 11 },
	{ code: '(6x1)(1x3)A', length: 6 },
	{ code: 'X(8x2)(3x3)ABCY', length: 18 }
];

const decompress = require('../decompress');
const expect = require('chai').expect;

describe('cecompress', () => {
	it('ADVENT', () => {
		const str = 'ADVENT';
		const decompressed = decompress(str);
		expect(decompressed.length).to.equal(6);
		expect(decompressed).to.equal('ADVENT');
	});
	it('A(1x5)BC', () => {
		const str = 'A(1x5)BC';
		const decompressed = decompress(str);
		expect(decompressed).to.equal('ABBBBBC');
	});
	it('(3x3)XYZ', () => {
		const str = '(3x3)XYZ';
		const decompressed = decompress(str);
		expect(decompressed).to.equal('XYZXYZXYZ');
	});
	it('A(2x2)BCD(2x2)EFG', () => {
		const str = 'A(2x2)BCD(2x2)EFG';
		const decompressed = decompress(str);
		expect(decompressed).to.equal('ABCBCDEFEFG');
	});
	it('(6x1)(1x3)A', () => {
		const str = '(6x1)(1x3)A';
		const decompressed = decompress(str);
		expect(decompressed).to.equal('(1x3)A');
	});
	it('X(8x2)(3x3)ABCY', () => {
		const str = 'X(8x2)(3x3)ABCY';
		const decompressed = decompress(str);
		expect(decompressed).to.equal('X(3x3)ABC(3x3)ABCY');
	});
	it('all strings together', () => {
		const str = 'ADVENTA(1x5)BC(3x3)XYZA(2x2)BCD(2x2)EFG(6x1)(1x3)AX(8x2)(3x3)ABCY';
		const decompressed = decompress(str);
		expect(decompressed).to.equal('ADVENTABBBBBCXYZXYZXYZABCBCDEFEFG(1x3)AX(3x3)ABC(3x3)ABCY');
	});
});