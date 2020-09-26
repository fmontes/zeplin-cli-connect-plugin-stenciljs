import Plugin from "../index";

describe("Connected Components StencilJS Plugin - TypeScript", () => {
    let plugin: Plugin;

    describe("config file", () => {
        beforeEach(() => {
            plugin = new Plugin();
        });
    
        test("it should throw error when no source file passed", async () => {
            expect(plugin.init({})).rejects.toEqual(
                new Error(
                    "You need to pass a valid document json file. More information in: https://github.com/fmontes/zeplin-cli-connect-plugin-stenciljs"
                )
            );
        });

        test("it should throw error when no source file can't be parsed", async () => {
            expect(
                plugin.init({
                    config: {
                        sourcePath: "path-dont-work",
                    },
                })
            ).rejects.toEqual(
                new Error(
                    "Can't parse your documentation json file. More information in: https://github.com/fmontes/zeplin-cli-connect-plugin-stenciljs"
                )
            );
        });
    });

    describe("proccess", () => {
        beforeEach(() => {
            plugin = new Plugin();
            plugin.init({
                config: {
                    sourcePath: "./src/__tests__/source.mock.json"
                }
            })
        });
        it("my-compontent.tsx snippet creation", async () => {
            const componentCode = await plugin.process(
                {
                    path: "/my-compontent.tsx",
                    zeplinNames: []
                }
            );
    
            expect(componentCode).toMatchSnapshot();
        })  
    })
});
