import { invalidUploadRequestMock, measureMock } from './mocks';
import { uploadService } from '../services/uploadService';

jest.mock('../repository', () => {
  return {
    getMeasureByCustomerCode: jest.fn().mockImplementation(() => [measureMock])
  } 
});

describe("upload tests", () => {

  test("should return INVALID_DATA error", async () => {
    
    await expect(uploadService(invalidUploadRequestMock)).rejects.toEqual({
      message: {
        error_code: "INVALID_DATA",
        error_description: expect.any(String)
      },
      status_code: 400
    });
  });
});
