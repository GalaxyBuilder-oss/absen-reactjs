import { DORMITORY, MemberPUB } from "./../src/types/types";

describe("MemberPUB", () => {
  it("MemberPUB Should support in typescript", () => {
    const member: MemberPUB = {
      id: "apa",
      name: "Salim",
      generation: {
        no: 21,
        name: "Getch",
        count: 12,
      },
      dormitory: DORMITORY.ASWAN,
      point: 10,
      alpha: false,
      late: false,
      permit: true,
      present: false,
    };

    expect(member.name).toBe("Salim");
  });
});
