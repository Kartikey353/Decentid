// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        string hash; 
        string filename;
        uint256 upload_timestamp;
        uint256 verified_timestamp;
        bool verified;
        address verifier;
        address owner;
        string verifying_code;
        string documentinfo;
        string msg_document;
    }

    mapping(string => Document) public documents;
    mapping(address => mapping(uint256 => Document)) public Verifiers;
    mapping(address => mapping(uint256 => Document)) public Owners;
    mapping(string => mapping(uint256 => Document)) public _verifying_code;

    event adddocuments(address, address, string, string);

    mapping(address => uint256) public Verifier_document_count;
    mapping(address => uint256) public Owner_document_count;
    mapping(address => bool) public existence;

    function addDocument(
        string memory _hash, 
        string memory filename,
        address owner,
        address verifier,
        string memory documentinfo,
        string memory verifying_code
    ) public {
        require(owner != address(0), "Invalid owner address");
        require(verifier != address(0), "Invalid verifier address");
        require(
            bytes(verifying_code).length > 0,
            "verifying code can not be empty"
        );
        Owners[owner][Owner_document_count[owner]] = Document(
            _hash, 
            filename,
            block.timestamp,
            0,
            false,
            verifier,
            owner,
            verifying_code,
            documentinfo,
            ""
        );
        Verifiers[verifier][Verifier_document_count[verifier]] = Document(
            _hash,  
            filename,
            block.timestamp,
            0,
            false,
            verifier,
            owner,
            verifying_code,
            documentinfo,
            ""
        );
        Owner_document_count[owner]++;
        Verifier_document_count[verifier]++;
        existence[owner] = true;
        emit adddocuments(owner, verifier, _hash, verifying_code);
    }

    function verifyDocuments(
        uint256 index,
        address owner,
        address verifier,
        string memory message
    ) public {
        require(existence[owner] == true, "Invalid Owner Account");
        require(
            index <= Owner_document_count[owner],
            "No file is associated with given index"
        );
        require(
            Owners[owner][index].verifier == verifier,
            "Invalid verifier account"
        );
        require(
            Owners[owner][index].verified == false,
            "Document Already verified"
        );
        uint256 time = block.timestamp;
        Owners[owner][index].verified = true;
        Owners[owner][index].verified_timestamp = time;
        Owners[owner][index].msg_document = message;
        Verifiers[verifier][index].verified = true;
        Verifiers[verifier][index].verified_timestamp = time;
        Verifiers[verifier][index].msg_document = message;
    }
}
