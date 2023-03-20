import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
const Upload = () => {
    return (
        <>
            <div className="md:w-[80vw] mx-auto">
                <div className="justify-center flex mt-32">
                    <Card color="transparent" shadow={false}>
                        <Typography variant="h4" color="blue-gray">
                            Upload Document
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter details to upload.
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="File Name" />
                                <Input size="lg" label="Description" />
                                <Input type="text" size="lg" label="Verifier Address" />
                                <Input type="file" size="lg" label="File" />
                            </div>
                            <Checkbox
                                label={
                                    (
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="flex items-center font-normal"
                                        >
                                            I agree the
                                            <a
                                                href="#"
                                                className="font-medium transition-colors hover:text-blue-500"
                                            >
                                                &nbsp;Terms and Conditions
                                            </a>
                                        </Typography>
                                    )
                                }
                                containerProps={{ className: "-ml-2.5" }}
                            />
                            <Button className="mt-6" fullWidth>
                               Upload
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Learn How your documents{" "}
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                                >
                                    Are secure ?
                                </a>
                            </Typography>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Upload