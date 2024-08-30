import { listService } from "../services/listService";

jest.mock('../repository', () => {
    return {
        getMeasureByCustomerCode: jest.fn().mockImplementation(() => []),
    }
});

describe("list tests", () => {

    test("should return INVALID_TYPE error", async () => {
    
        await expect(listService("123830928", "wATER")).rejects.toEqual({
          message: {
            error_code: "INVALID_TYPE",
            error_description: "Tipo de medição não permitida"
          },
          status_code: 400
        });
      });

    test("should return MEASURES_NOT_FOUND error", async () => {

    await expect(listService("123830928", "WATER")).rejects.toEqual({
        message: {
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada"
        },
        status_code: 404
    });
    });
})
