@{
    # If authoring a script module, the RootModule is the name of your .psm1 file
    RootModule = 'NextAppModule.psm1'

    Author = 'Matthew Ford <matthew@matthewford.us>'

    CompanyName = 'Matthew Ford'

    ModuleVersion = '0.0.1'

    # Use the New-Guid command to generate a GUID, and copy/paste into the next line
    GUID = '5793e535-dc44-480e-9f3e-47474f52e50e'

    Copyright = '2017 Matthew Ford <matthew@matthewford.us>'

    Description = 'What does this module do?'

    # Minimum PowerShell version supported by this module (optional, recommended)
    PowerShellVersion = '6.0.0-beta.8'

    # Which PowerShell Editions does this module work with? (Core, Desktop)
    CompatiblePSEditions = @('Desktop', 'Core')

    # Which PowerShell functions are exported from your module? (eg. Get-CoolObject)
    FunctionsToExport = @('')

    # Which PowerShell aliases are exported from your module? (eg. gco)
    AliasesToExport = @('')

    # Which PowerShell variables are exported from your module? (eg. Fruits, Vegetables)
    VariablesToExport = @('')

    # PowerShell Gallery: Define your module's metadata
    PrivateData = @{
        PSData = @{
            # What keywords represent your PowerShell module? (eg. cloud, tools, framework, vendor)
            Tags = @('cooltag1', 'cooltag2')

            # What software license is your code being released under? (see https://opensource.org/licenses)
            LicenseUri = ''

            # What is the URL to your project's website?
            ProjectUri = ''

            # What is the URI to a custom icon file for your project? (optional)
            IconUri = ''

            # What new features, bug fixes, or deprecated features, are part of this release?
            ReleaseNotes = @'
'@
        }
    }

    # If your module supports updateable help, what is the URI to the help archive? (optional)
    # HelpInfoURI = ''

    # RequiredAssemblies = []
}
