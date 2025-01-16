use anyhow::Error;
use std::process::Command;

pub fn update_version(version: String) -> Result<(), Error> {
    let output = Command::new("npm")
        .args(["version", &version, "--no-git-tag-version"])
        .output()?;

    if !output.status.success() {
        return Err(Error::msg(String::from_utf8_lossy(&output.stderr)));
    }

    Ok(())
}
