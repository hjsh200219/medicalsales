import Layout from '@/components/Layout';

export default function MedicalInstitutions() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">의료기관 조회</h1>
        
        {/* 검색 필터 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">지역</label>
              <select id="region" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">전체</option>
                <option value="서울">서울특별시</option>
                <option value="부산">부산광역시</option>
                <option value="대구">대구광역시</option>
                <option value="인천">인천광역시</option>
                <option value="광주">광주광역시</option>
                <option value="대전">대전광역시</option>
                <option value="울산">울산광역시</option>
                <option value="세종">세종특별자치시</option>
                <option value="경기">경기도</option>
                <option value="강원">강원도</option>
              </select>
            </div>
            <div>
              <label htmlFor="medicalType" className="block text-sm font-medium text-gray-700 mb-1">유형</label>
              <select id="medicalType" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">전체</option>
                <option value="hospital">병원</option>
                <option value="clinic">의원</option>
                <option value="dental">치과</option>
                <option value="oriental">한의원</option>
                <option value="pharmacy">약국</option>
              </select>
            </div>
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">검색어</label>
              <div className="flex">
                <input type="text" id="keyword" placeholder="의료기관명 검색" className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600">
                  검색
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 의료기관 목록 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-blue-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold">의료기관 목록</h2>
            <span className="text-sm text-gray-500">총 24개 기관</span>
          </div>
          <ul className="divide-y divide-gray-200">
            {medicalInstitutions.map((institution) => (
              <li key={institution.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{institution.name}</h3>
                    <p className="text-sm text-gray-500">{institution.type} | {institution.address}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="mr-3">Tel: {institution.phone}</span>
                      {institution.isOpen && <span className="text-green-600 font-medium">영업중</span>}
                      {!institution.isOpen && <span className="text-red-500">영업종료</span>}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mb-2">{institution.specialty}</span>
                    <button className="text-sm text-blue-600 hover:text-blue-800">상세보기</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 flex justify-center">
            <nav className="flex items-center">
              <button className="mx-1 px-3 py-1 rounded hover:bg-gray-200">&lt;</button>
              <button className="mx-1 px-3 py-1 rounded bg-blue-500 text-white">1</button>
              <button className="mx-1 px-3 py-1 rounded hover:bg-gray-200">2</button>
              <button className="mx-1 px-3 py-1 rounded hover:bg-gray-200">3</button>
              <button className="mx-1 px-3 py-1 rounded hover:bg-gray-200">&gt;</button>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// 샘플 데이터
const medicalInstitutions = [
  {
    id: 1,
    name: '서울대학교병원',
    type: '종합병원',
    address: '서울특별시 종로구 대학로 101',
    phone: '02-2072-2114',
    specialty: '종합',
    isOpen: true
  },
  {
    id: 2,
    name: '연세세브란스병원',
    type: '종합병원',
    address: '서울특별시 서대문구 연세로 50-1',
    phone: '02-2228-0114',
    specialty: '종합',
    isOpen: true
  },
  {
    id: 3,
    name: '강남연세사랑병원',
    type: '병원',
    address: '서울특별시 강남구 역삼로 245',
    phone: '02-3462-3000',
    specialty: '정형외과',
    isOpen: false
  },
  {
    id: 4,
    name: '미소드림치과의원',
    type: '치과의원',
    address: '서울특별시 강남구 테헤란로 101',
    phone: '02-555-7788',
    specialty: '치과',
    isOpen: true
  },
  {
    id: 5,
    name: '건강한약국',
    type: '약국',
    address: '서울특별시 강남구 역삼로 123',
    phone: '02-555-9900',
    specialty: '약국',
    isOpen: true
  }
]; 