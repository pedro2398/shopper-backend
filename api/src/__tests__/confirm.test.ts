import { confirmService } from "../services/confirmService";
import { invalidConfirmRequestMock, measureMock, confirmRequestMock } from "./mocks";

jest.mock('../repository', () => {
    return {
        getMeasureByUuid: jest.fn().mockImplementation(() => measureMock),
        saveMeasure: jest.fn().mockImplementation(() => measureMock)
    }
});

describe("confim tests", () => {

    test("should not return error", async () => {
        await expect(confirmService(confirmRequestMock)).resolves.toEqual({success: true});
    });

    test("should return INVALID_DATA error", async () => {

        await expect(confirmService(invalidConfirmRequestMock)).rejects.toEqual({
            message: {
            error_code: "INVALID_DATA",
            error_description: expect.any(String)
            },
            status_code: 400
        });
    });

})
